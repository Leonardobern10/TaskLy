import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

/**
 * Serviço para operações de usuário no banco de dados.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
    @Inject(Logger) private logger: Logger,
  ) {}

  /**
   * Busca um usuário pelo email.
   * @param {string} email - Email do usuário.
   * @returns {Promise<UserEntity | null>} Usuário encontrado ou null.
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  /**
   * Busca um usuário pelo ID.
   * @param {string} id - ID do usuário.
   * @returns {Promise<UserEntity | null>} Usuário encontrado ou null.
   */
  async findById(id: string): Promise<UserEntity | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  /**
   * Cria um novo usuário com senha hash.
   * @param {string} name - Nome do usuário.
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha do usuário.
   * @returns {Promise<UserEntity>} Usuário criado.
   */
  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    this.logger.log('Registrando usuário...');
    try {
      const hash: string = await bcrypt.hash(password, 10);
      const userExists: boolean = await this.isValidEmail(email);
      if (userExists) {
        this.logger.warn('Falha no registro: Usuário já cadastrado!');
        throw new RpcException({
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Esse e-mail já foi cadastrado! Faça seu login.',
          errorName: 'Usuário cadastrado!',
        });
      }
      const user: UserEntity = this.usersRepo.create({
        name,
        email,
        password: hash,
      });
      return this.usersRepo.save(user);
    } catch (error) {
      this.logger.error(`Erro ao registrar usuário: ${email} `, error);
      throw error;
    }
  }

  /**
   * Atualiza o refresh token de um usuário.
   * @param {string} id - ID do usuário.
   * @param {string} token - Refresh token.
   * @returns {Promise<void>}
   */
  async updateRefreshToken(id: string, token: string): Promise<void> {
    await this.usersRepo.update(id, { refreshToken: token });
  }

  /**
   * Remove o refresh token de um usuário.
   * @param {string} id - ID do usuário.
   * @returns {Promise<void>}
   */
  async removeRefreshToken(id: string): Promise<void> {
    await this.usersRepo.update(id, { refreshToken: null });
  }

  /**
   * Verifica se um email já está cadastrado.
   * @param {string} email - Email a ser verificado.
   * @returns {Promise<boolean>} True se o email existir, false caso contrário.
   */
  async isValidEmail(email: string): Promise<boolean> {
    const user = await this.usersRepo.findOne({ where: { email } });
    return !!user;
  }

  /**
   * Retorna todos os usuários cadastrados.
   * @returns {Promise<UserEntity[]>} Lista de usuários.
   */
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.usersRepo.find();
    return users;
  }
}
