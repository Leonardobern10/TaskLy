import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
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
import { Routes } from 'src/utils/routes';

@ApiTags('Auth')
@Controller(Routes.AUTH.DEFAULT_PATH)
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
  @Post(Routes.AUTH.LOGIN.PATH)
  @ApiOperation(Routes.AUTH.LOGIN.DESCRIPTION)
  @ApiBody(Routes.AUTH.LOGIN.BODY_SCHEMA)
  @ApiOkResponse(Routes.AUTH.LOGIN.RESPONSE_200)
  @ApiUnauthorizedResponse(Routes.AUTH.LOGIN.UNAUTHORIZED_401)
  @ApiBadRequestResponse(Routes.AUTH.LOGIN.BAD_REQUEST_400)
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
  @Post(Routes.AUTH.REGISTER.PATH)
  @ApiOperation(Routes.AUTH.REGISTER.DESCRIPTION)
  @ApiBody(Routes.AUTH.REGISTER.BODY_SCHEMA)
  @ApiCreatedResponse(Routes.AUTH.REGISTER.RESPONSE_201)
  @ApiBadRequestResponse(Routes.AUTH.REGISTER.BAD_REQUEST_400)
  @ApiInternalServerErrorResponse(Routes.AUTH.REGISTER.INTERNAL_500)
  async register(@Body() dto: RegisterDto): Promise<UserEntity> {
    return lastValueFrom(this.authService.send('auth.register', dto));
  }

  /**
   * Retorna o perfil do usuário autenticado.
   * @param {Request} req - Objeto Request do Express contendo user
   * @returns {Promise<ExpressUser>} - Retorna dados do usuário autenticado
   */
  @UseGuards(JwtAuthGuard)
  @Get(Routes.AUTH.PROFILE.PATH)
  @ApiBearerAuth()
  @ApiOperation(Routes.AUTH.PROFILE.DESCRIPTION)
  @ApiOkResponse(Routes.AUTH.PROFILE.RESPONSE_200)
  @ApiUnauthorizedResponse(Routes.AUTH.PROFILE.UNAUTHORIZED_401)
  async getProfile(@Req() req: AuthRequest): Promise<ExpressUser> {
    return req.user;
  }

  /**
   * Gera um novo access token usando refresh token.
   * @param {Request} req - Objeto Request do Express com cookie refresh_token
   * @param {Response} res - Objeto Response do Express para setar novo cookie
   * @returns {Promise<ResponseRefresh>} - Retorna novo access_token
   * @throws {BadRequestException} - Se refresh token estiver ausente ou inválido
   */
  @Post(Routes.AUTH.REFRESH.PATH)
  @ApiOperation(Routes.AUTH.REFRESH.DESCRIPTION)
  @ApiOkResponse(Routes.AUTH.REFRESH.RESPONSE_200)
  @ApiBadRequestResponse(Routes.AUTH.REFRESH.BAD_REQUEST_400)
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
  @Post(Routes.AUTH.LOGOUT.PATH)
  @ApiBearerAuth()
  @ApiOperation(Routes.AUTH.LOGOUT.DESCRIPTION)
  @ApiOkResponse(Routes.AUTH.LOGOUT.RESPONSE_200)
  @ApiNotFoundResponse(Routes.AUTH.LOGOUT.NOT_FOUND_404)
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
  @Get(Routes.AUTH.GET_ALL.PATH)
  @ApiBearerAuth()
  @ApiOperation(Routes.AUTH.GET_ALL.DESCRIPTION)
  @ApiOkResponse(Routes.AUTH.GET_ALL.RESPONSE_200)
  @ApiNotFoundResponse(Routes.AUTH.GET_ALL.NOT_FOUND_404)
  async getAllUsers(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserEntity[]> {
    const { id } = req.user;
    return lastValueFrom(this.authService.send('auth.allUsers', id));
  }
}
