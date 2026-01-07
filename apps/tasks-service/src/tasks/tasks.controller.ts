import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './entities/dto/create-task.dto';
import { UpdateTaskDto } from './entities/dto/update-task.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/utils/pagination.dto';

/**
 * Controller responsável por consumir eventos relacionados a Tasks
 * através de mensageria (microservices).
 *
 * Atua como camada de entrada, delegando a lógica
 * para o TasksService.
 */
@Controller()
export class TasksController {
  constructor(private readonly service: TasksService) {}

  /**
   * Cria uma nova task.
   *
   * Evento esperado: `tasks.created`
   *
   * @param payload - Dados da criação da task
   * @param payload.dto - DTO com informações da task
   * @param payload.email - Email do autor da task
   * @returns Task criada
   */
  @MessagePattern('tasks.created')
  create(@Payload() payload: { dto: CreateTaskDto; email: string }) {
    return this.service.create(payload.dto, payload.email);
  }

  /**
   * Retorna uma lista paginada de tasks com filtros opcionais.
   *
   * Evento esperado: `tasks.findAll`
   *
   * @param dto - DTO de paginação e filtros
   * @returns Lista paginada de tasks
   */
  @MessagePattern('tasks.findAll')
  findAll(@Payload() dto: PaginationDto) {
    return this.service.findAll(dto);
  }

  /**
   * Retorna uma task específica pelo ID.
   *
   * Evento esperado: `tasks.findOne`
   *
   * @param id - Identificador da task
   * @returns Task encontrada ou null
   */
  @MessagePattern('tasks.findOne')
  findOne(@Payload() id: string) {
    return this.service.findOne(id);
  }

  /**
   * Atualiza uma task existente.
   *
   * Evento esperado: `tasks.update`
   *
   * @param data - Dados da atualização
   * @param data.id - Identificador da task
   * @param data.dto - DTO com campos atualizáveis
   * @returns Task atualizada
   */
  @MessagePattern('tasks.update')
  update(@Payload() data: { id: string; dto: UpdateTaskDto }) {
    return this.service.update(data.id, data.dto);
  }

  /**
   * Remove uma task pelo ID.
   *
   * Evento esperado: `tasks.delete`
   *
   * @param id - Identificador da task
   * @returns Mensagem de confirmação
   */
  @MessagePattern('tasks.delete')
  remove(@Payload() id: string) {
    return this.service.remove(id);
  }

  /**
   * Busca tasks filtradas por prioridade.
   *
   * Evento esperado: `tasks.priority`
   *
   * @param dto - DTO de paginação contendo prioridade
   * @returns Lista paginada de tasks
   */
  @MessagePattern('tasks.priority')
  findByPriority(@Payload() dto: PaginationDto) {
    return this.service.findAll(dto);
  }

  /**
   * Busca tasks filtradas por status.
   *
   * Evento esperado: `tasks.status`
   *
   * @param dto - DTO de paginação contendo status
   * @returns Lista paginada de tasks
   */
  @MessagePattern('tasks.status')
  findByStatus(@Payload() dto: PaginationDto) {
    return this.service.findAll(dto);
  }

  /**
   * Busca tasks filtradas por título.
   *
   * Evento esperado: `tasks.title`
   *
   * @param dto - DTO de paginação contendo título
   * @returns Lista paginada de tasks
   */
  @MessagePattern('tasks.title')
  findByTitle(@Payload() dto: PaginationDto) {
    return this.service.findAll(dto);
  }
}
