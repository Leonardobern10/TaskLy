import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import type { Response, Request } from 'express';

import { LoginDto } from 'src/entities/dto/LoginDto';
import { RegisterDto } from 'src/entities/dto/RegisterDto';
import { UserEntity } from 'src/entities/UserEntity';

import { InterfaceAuthController } from 'src/interfaces/InterfaceAuthController';
import { clearRefreshCookie, setRefreshCookie } from 'src/utils/cookies';
import type { AuthRequest, ExpressUser } from 'src/types/ExpressUser';
import {
  ResponseAuthController,
  ResponseLogout,
  ResponseRefresh,
} from 'src/types/ResponsesAuthGateway';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements InterfaceAuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  /**
   * Autentica um usuário e retorna tokens de acesso e refresh.
   * @param {LoginDto} body - DTO contendo email e senha do usuário
   * @param {Response} res - Objeto Response do Express para setar cookie
   * @returns {Promise<ResponseAuthController>} - Retorna access_token e dados do usuário
   * @throws {BadRequestException} - Se credenciais forem inválidas
   */
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    schema: { example: { email: 'joao@email.com', password: '123456' } },
  })
  @ApiCreatedResponse({
    description: 'User authenticated successfully',
    schema: {
      example: {
        access_token: 'jwt-access-token',
        refresh_token: 'jwt-refresh-token',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Unapropriated infos' })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseAuthController | void> {
    const result = await lastValueFrom(
      this.authService.send('auth.login', body),
    );

    if (result.refresh_token) {
      setRefreshCookie(res, result.refresh_token);
    }

    return {
      access_token: result.access_token,
      user: result.user,
    };
  }

  /**
   * Registra um novo usuário no sistema.
   * @param {RegisterDto} dto - DTO com dados do novo usuário
   * @returns {Promise<UserEntity>} - Retorna o usuário criado
   * @throws {InternalServerErrorException} - Se ocorrer erro inesperado
   */
  @Post('register')
  @ApiBody({
    schema: {
      example: { name: 'joao', email: 'joao@email.com', password: 'joao123' },
    },
  })
  @ApiOperation({ summary: 'Register new user' })
  @ApiCreatedResponse({
    description: 'User successfully registered',
    schema: {
      example: {
        id: 'uuid',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2025-12-03T15:12:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  async register(@Body() dto: RegisterDto): Promise<UserEntity> {
    return await lastValueFrom(this.authService.send('auth.register', dto));
  }

  /**
   * Retorna o perfil do usuário autenticado.
   * @param {Request} req - Objeto Request do Express contendo user
   * @returns {Promise<ExpressUser>} - Retorna dados do usuário autenticado
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return authenticated user profile' })
  @ApiOkResponse({
    description: 'Authenticated user',
    schema: {
      example: {
        id: 'uuid',
        email: 'john@example.com',
        name: 'John Doe',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired token' })
  async getProfile(@Req() req: any): Promise<ExpressUser> {
    return req.user;
  }

  /**
   * Gera um novo access token usando refresh token.
   * @param {Request} req - Objeto Request do Express com cookie refresh_token
   * @param {Response} res - Objeto Response do Express para setar novo cookie
   * @returns {Promise<ResponseRefresh>} - Retorna novo access_token
   * @throws {BadRequestException} - Se refresh token estiver ausente ou inválido
   */
  @Post('refresh')
  @ApiOperation({ summary: 'Generate a new access token' })
  @ApiOkResponse({
    description: 'Token refreshed',
    schema: {
      example: {
        access_token: 'new-jwt-access-token',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid refresh token' })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseRefresh | Response> {
    const token = req.cookies?.refresh_token;
    const result = await lastValueFrom(
      this.authService.send('auth.refresh', { refresh_token: token }),
    );
    if (result.refresh_token) setRefreshCookie(res, result.refresh_token);
    return { access_token: result.access_token };
  }

  /**
   * Faz logout do usuário, removendo refresh token.
   * @param {AuthRequest} req - Objeto Request com usuário autenticado
   * @param {Response} res - Objeto Response do Express para limpar cookie
   * @returns {Promise<ResponseLogout>} - Mensagem de logout
   * @throws {InternalServerErrorException} - Se ocorrer erro no logout
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  @ApiOkResponse({
    description: 'User logged out',
    schema: { example: { message: 'Logged out successfully' } },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async logout(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseLogout> {
    clearRefreshCookie(res);
    return await lastValueFrom(
      this.authService.send('auth.logout', req.user.id),
    );
  }

  /**
   * Retorna todos os usuários do sistema.
   * @param {Request} req - Objeto Request com usuário autenticado
   * @param {Response} res - Objeto Response do Express
   * @returns {Promise<UserEntity[]>} - Lista de usuários
   */
  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'All users' })
  @ApiOkResponse({
    description: 'User logged out',
    schema: { example: { message: 'Logged out successfully' } },
  })
  @ApiNotFoundResponse({ description: 'Userw not found' })
  async getAllUsers(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserEntity[]> {
    const { id } = req.user;
    // notifica auth-service para remover hash do DB
    return lastValueFrom(this.authService.send('auth.allUsers', id));
  }
}
