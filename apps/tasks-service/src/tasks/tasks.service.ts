import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './entities/dto/create-task.dto';
import { UpdateTaskDto } from './entities/dto/update-task.dto';
import { TaskHistory } from 'src/tasks-history/entities/task-history.entity';
import { Logger } from 'nestjs-pino';
import { PaginationDto } from 'src/utils/pagination.dto';
import { ClientProxy } from '@nestjs/microservices';
import { OrderParams } from 'types/OrderParams';

/**
 * Serviço responsável pelas regras de negócio relacionadas às Tasks.
 *
 * Inclui:
 * - Criação
 * - Listagem com paginação e filtros
 * - Atualização
 * - Remoção
 * - Histórico de alterações
 * - Emissão de eventos para notificações
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(TaskHistory)
    private readonly historyRepo: Repository<TaskHistory>,

    @Inject(Logger) private readonly logger: Logger,

    @Inject('NOTIFICATIONS_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  /**
   * Cria uma nova task e registra o histórico.
   *
   * Também emite evento `tasks.created` para o serviço de notificações.
   *
   * @param dto - Dados da task
   * @param email - Email do autor
   * @returns Task criada
   */
  async create(dto: CreateTaskDto, email: string) {
    try {
      this.logger.log('Iniciando criação de tarefa...');
      const task = this.taskRepo.create({ ...dto, authorEmail: email });
      await this.taskRepo.save(task);
      await this.logHistory(task.id, 'CREATED', null, task);
      this.client.emit('tasks.created', task).subscribe({
        error: (err) => this.logger.error(err),
      });
      this.logger.log('Tarefa criada com sucesso!');
      return task;
    } catch (error) {
      this.logger.error('Erro ao criar tarefa: ', error);
      throw error;
    }
  }

  /**
   * Retorna tasks paginadas com filtros opcionais.
   *
   * Filtros suportados:
   * - Título (LIKE)
   * - Prioridade
   * - Status
   *
   * @param pagination - DTO contendo paginação e filtros
   * @returns Lista paginada de tasks
   */
  async findAll(pagination: PaginationDto) {
    const { page, limit, title, priority, status, order } = pagination;

    const qb = this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.comments', 'comments');

    if (title) {
      qb.andWhere('LOWER(task.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    if (priority) {
      qb.andWhere('task.priority = :priority', { priority });
    }

    if (status) {
      qb.andWhere('task.status = :status', { status });
    }

    qb.skip((Number(page) - 1) * Number(limit)).take(Number(limit));

    // Novo trecho para ordenação
    let selectedOrder: OrderParams = order || OrderParams.CREATED;
    qb.orderBy(`task.${selectedOrder}`, 'DESC');

    const [data, totalItems] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / Number(limit)),
      },
    };
  }

  /**
   * Busca uma task pelo ID com seus relacionamentos.
   *
   * @param id - Identificador da task
   * @returns Task encontrada ou null
   */
  async findOne(id: string) {
    return this.taskRepo.findOne({
      where: { id },
      relations: ['comments', 'history'],
    });
  }

  /**
   * Atualiza uma task e registra o histórico da alteração.
   *
   * Também emite evento `tasks.updated`.
   *
   * @param id - Identificador da task
   * @param dto - DTO com dados atualizáveis
   * @returns Task atualizada
   */
  async update(id: string, dto: UpdateTaskDto) {
    try {
      const oldTask = await this.findOne(id);

      const updated = await this.taskRepo.save({
        ...oldTask,
        ...dto,
        assignedEmails: dto.assignedEmails || [],
      });
      await this.logHistory(id, 'UPDATED', oldTask, updated);
      this.client.emit('tasks.updated', updated);
      return updated;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Remove uma task e registra o histórico da remoção.
   *
   * @param id - Identificador da task
   * @throws NotFoundException - Caso a task não exista
   * @returns Mensagem de confirmação
   */
  async remove(id: string) {
    const task = await this.findOne(id);
    if (!task) throw new NotFoundException('Task not found.');
    await this.logHistory(id, 'DELETED', task, null);
    await this.taskRepo.remove(task);
    return { message: 'Task removed' };
  }

  /**
   * Registra o histórico de alterações de uma task.
   *
   * @param taskId - Identificador da task
   * @param action - Ação executada (CREATED, UPDATED, DELETED)
   * @param oldValue - Estado anterior
   * @param newValue - Estado atual
   */
  private logHistory(
    taskId: string,
    action: string,
    oldValue: any,
    newValue: any,
  ) {
    const history = this.historyRepo.create({
      action,
      oldValue: JSON.stringify(oldValue),
      newValue: JSON.stringify(newValue),
      task: { id: taskId },
    });
    return this.historyRepo.save(history);
  }
}
