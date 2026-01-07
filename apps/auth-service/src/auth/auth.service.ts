import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Logger } from 'nestjs-pino';
import { ResponseAuthLogin } from 'src/types/ResponseAuthLogin';
import { ResponseAuthRefresh } from 'src/types/ResponseAuthRefresh';
import { ResponseAuthLogout } from 'src/types/ResponseAuthLogout';
import { UserEntity } from 'src/users/user.entity';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

/**
 * Serviço responsável por toda a lógica de autenticação, incluindo login,
 * refresh token, logout e criação de usuários.
 */
@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly refreshSecret: string;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(Logger) private readonly logger: Logger,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')!;
    this.refreshSecret = this.configService.get<string>('REFRESH_SECRET_KEY')!;
  }

  /**
   * Autentica um usuário com email e senha.
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {Promise<ResponseAuthLogin>} Tokens e dados do usuário autenticado.
   * @throws {UnauthorizedException} Se email ou senha forem inválidos.
   */
  async login(email: string, password: string): Promise<ResponseAuthLogin> {
    this.logger.log(`Iniciando processo de login para ${email}...`);
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        this.logger.warn(
          `Falha de autenticação: usuário não encontrado - ${email}`,
        );
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Usuário não encontrado! Faça seu cadastro.',
          errorName: 'Not found',
        });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        this.logger.warn(`Falha de autenticação: senha inválida - ${email}`);
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Credenciais inválidas! Tente novamente.',
          errorName: 'Unauthorized Exception',
        });
      }

      const payload = { sub: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '15m',
      });

      const refreshToken = this.jwtService.sign(payload, {
        secret: this.refreshSecret,
        expiresIn: '7d',
      });

      const hashedRefresh = await bcrypt.hash(refreshToken, 10);
      await this.usersService.updateRefreshToken(user.id, hashedRefresh);
      this.logger.log(`Login realizado com sucesso para ${email}!`);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      this.logger.error(`Erro no login para ${email}`, error);
      throw error;
    }
  }

  /**
   * Atualiza o access token usando o refresh token.
   * @param {{ refresh_token: string }} data - Objeto com refresh token.
   * @returns {Promise<ResponseAuthRefresh>} Novo access token e refresh token.
   * @throws {UnauthorizedException} Se o refresh token for inválido ou expirado.
   */
  async refresh(data: { refresh_token: string }): Promise<ResponseAuthRefresh> {
    this.logger.log(`Iniciando processo de refreshToken...`);
    try {
      if (!data.refresh_token) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Token não encontrado!',
          errorName: 'Invalid credentials',
        });
      }
      const rt = data.refresh_token;
      const decoded = this.jwtService.verify(rt, {
        secret: this.refreshSecret,
      });

      const user = await this.usersService.findById(decoded.sub);

      if (!user || !user.refreshToken) {
        this.logger.warn('Falha na atualização do token');
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Credenciais inválidas!',
          errorName: 'Credenciais inválidas',
        });
      }

      const valid = await bcrypt.compare(rt, user.refreshToken);
      if (!valid) {
        this.logger.warn('Falha de atualização de token');
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Credenciais inválidas!',
          errorName: 'Credenciais inválidas',
        });
      }

      const payload = { sub: user.id, email: user.email };
      const newAccessToken = this.jwtService.sign(payload, {
        secret: this.jwtSecret,
        expiresIn: '15m',
      });

      const newRefreshToken = this.jwtService.sign(payload, {
        secret: this.refreshSecret,
        expiresIn: '7d',
      });

      const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 10);
      await this.usersService.updateRefreshToken(user.id, hashedNewRefresh);

      this.logger.log('Refresh token atualizado com sucesso!');

      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (error) {
      this.logger.error('Erro ao atualizar refresh token: ', error);
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Credenciais inválidas!',
        errorName: 'Credenciais inválidas',
      });
    }
  }

  /**
   * Realiza logout do usuário removendo seu refresh token.
   * @param {string} userId - ID do usuário.
   * @returns {Promise<ResponseAuthLogout>} Mensagem de logout.
   * @throws {BadRequestException} Se o usuário não for encontrado.
   */
  async logout(userId: string): Promise<ResponseAuthLogout> {
    const user = await this.usersService.findById(userId);
    if (!user) throw new BadRequestException('Usuário não encontrado');
    await this.usersService.removeRefreshToken(userId);
    return { message: 'Logout realizado com sucesso!' };
  }

  /**
   * Cria um novo usuário.
   * @param {RegisterDto} registerDto - Dados do usuário.
   * @returns {Promise<UserEntity>} Usuário criado.
   */
  async create(registerDto: RegisterDto): Promise<UserEntity> {
    return this.usersService.create(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  /**
   * Valida se um email já está cadastrado.
   * @param {string} email - Email a ser validado.
   * @returns {Promise<boolean>} True se o email estiver disponível.
   */
  async validateEmail(email: string): Promise<boolean> {
    return await this.usersService.isValidEmail(email);
  }

  /**
   * Retorna todos os usuários cadastrados.
   * @returns {Promise<UserEntity[]>} Lista de usuários.
   */
  async getAll(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }
}
