import { Request } from 'express';
import { Comment } from 'src/entities/Comment';
import { CreateCommentDto } from 'src/entities/dto/CreateCommentDto';
import { CreateTaskDto } from 'src/entities/dto/CreateTaskDto.dto';
import { UpdateTaskDto } from 'src/entities/dto/UpdateTaskDto.dto';
import { TaskPriority } from 'src/entities/enum/TaskPriority';
import { TaskStatus } from 'src/entities/enum/TaskStatus';
import { Task } from 'src/entities/Task';
import { FindTasksQueryDto } from 'src/types/FindTasksQueryDTO';
import { ResponseTasksFindAll } from 'src/types/ReturnTasksGateway';

/**
 * Interface para o TasksController, definindo métodos que um controlador de tarefas deve implementar.
 */
export interface IntefaceTasksController {
  /**
   * Cria uma nova tarefa.
   * @param {CreateTaskDto} dto - DTO com os dados da tarefa.
   * @param {Request} req - Objeto Request do Express, usado para obter dados do usuário autenticado.
   * @returns {Promise<Task>} Retorna a tarefa criada.
   */
  create(dto: CreateTaskDto, req: Request): Promise<Task>;

  /**
   * Retorna todas as tarefas com paginação e filtros opcionais.
   * @param {string} page - Página atual.
   * @param {string} limit - Número de itens por página.
   * @param {TaskPriority} [priority] - Filtro por prioridade da tarefa.
   * @param {TaskStatus} [status] - Filtro por status da tarefa.
   * @param {string} [title] - Filtro por título da tarefa.
   * @returns {Promise<ResponseTasksFindAll>} Retorna objeto com tarefas paginadas.
   */
  findAll(query: FindTasksQueryDto): Promise<ResponseTasksFindAll>;

  /**
   * Retorna uma tarefa específica pelo seu ID.
   * @param {string} id - ID da tarefa.
   * @returns {Promise<Task | null>} Retorna a tarefa ou null se não encontrada.
   */
  findOne(id: string): Promise<Task | null>;

  /**
   * Atualiza uma tarefa existente.
   * @param {string} id - ID da tarefa.
   * @param {UpdateTaskDto} dto - DTO com os dados para atualização.
   * @returns {Promise<Task>} Retorna a tarefa atualizada.
   */
  update(id: string, dto: UpdateTaskDto): Promise<Task>;

  /**
   * Remove uma tarefa pelo seu ID.
   * @param {string} id - ID da tarefa.
   * @returns {Promise<void>} Retorna void.
   */
  remove(id: string): Promise<void>;

  /**
   * Cria um comentário em uma tarefa.
   * @param {string} taskId - ID da tarefa.
   * @param {CreateCommentDto} dto - DTO com os dados do comentário.
   * @param {any} req - Objeto Request, usado para obter dados do usuário autenticado.
   * @returns {Promise<Comment>} Retorna o comentário criado.
   */
  createComments(
    taskId: string,
    dto: CreateCommentDto,
    req: any,
  ): Promise<Comment>;

  /**
   * Retorna os comentários de uma tarefa com paginação.
   * @param {string} taskId - ID da tarefa.
   * @param {number} [page] - Página atual.
   * @param {number} [limit] - Número de itens por página.
   * @returns {Promise<Comment[]>} Retorna lista de comentários.
   */
  findCommentsByTask(
    taskId: string,
    page?: number,
    limit?: number,
  ): Promise<Comment[]>;

  /**
   * Remove um comentário pelo seu ID.
   * @param {string} commentId - ID do comentário.
   * @returns {Promise<void>} Retorna void.
   */
  removeComments(commentId: string): Promise<void>;
}
