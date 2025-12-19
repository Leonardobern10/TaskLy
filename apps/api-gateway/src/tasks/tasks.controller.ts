import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { lastValueFrom } from 'rxjs';
import { CreateCommentDto } from 'src/entities/dto/CreateCommentDto';
import { CreateTaskDto } from 'src/entities/dto/CreateTaskDto.dto';
import { UpdateTaskDto } from 'src/entities/dto/UpdateTaskDto.dto';
import { TaskPriority } from 'src/entities/enum/TaskPriority';
import { TaskStatus } from 'src/entities/enum/TaskStatus';
import { IntefaceTasksController } from 'src/interfaces/InterfaceTasksController';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { FindTasksQueryDto } from 'src/types/FindTasksQueryDTO';
import { OrderParams } from 'src/types/OrderParams';

/**
 * Controller responsável por gerenciar tarefas e seus comentários.
 * Implementa a interface IntefaceTasksController.
 */
@UseGuards(JwtAuthGuard)
@ApiTags('tasks')
@Controller('tasks')
export class TasksController implements IntefaceTasksController {
  constructor(
    @Inject('TASKS_SERVICE') private readonly taskService: ClientProxy,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  /**
   * Cria uma nova tarefa.
   * @param {CreateTaskDto} dto - Dados da tarefa.
   * @param {any} req - Objeto de requisição, para acessar o usuário autenticado.
   * @returns {Promise<any>} Retorna a tarefa criada.
   */
  @Post()
  @ApiBody({
    schema: {
      example: {
        title: 'Nova tarefa',
        description: 'Adicionando nova tarefa',
        dueDate: new Date(),
        priority: TaskPriority.HIGH,
        status: TaskStatus.IN_PROGRESS,
        assignedEmails: 'joao@email.com',
      },
    },
  })
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({
    description: 'Task successfully created',
    schema: {
      example: {
        id: 'uuid',
        title: 'Nova tarefa',
        description: 'Adicionando nova tarefa',
        status: TaskStatus.IN_PROGRESS,
        createdAt: '2025-12-03T15:12:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  async create(@Body() dto: CreateTaskDto, @Req() req: any) {
    this.logger.log('Received request: POST /tasks');
    return lastValueFrom(
      this.taskService.send('tasks.created', {
        dto: dto,
        email: req.user.email,
      }),
    );
  }

  /**
   * Lista tarefas paginadas com filtros opcionais.
   * @param {string} page - Página atual.
   * @param {string} limit - Número de itens por página.
   * @param {TaskPriority} [priority] - Filtra por prioridade.
   * @param {TaskStatus} [status] - Filtra por status.
   * @param {string} [title] - Filtra por título.
   * @returns {Promise<any>} Retorna as tarefas filtradas e paginadas.
   */
  @Get()
  @ApiOperation({ summary: 'List tasks paginated' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'priority', required: false, example: 'LOW' })
  @ApiOkResponse({
    description: 'Paginated tasks',
    schema: {
      example: {
        data: [
          {
            id: 'uuid',
            title: 'Design DB schema',
            status: 'IN_PROGRESS',
            comments: [],
            createdAt: '2025-12-02T20:00:00.000Z',
          },
        ],
        currentPage: 1,
        limit: 10,
        total: 7,
        totalPages: 1,
      },
    },
  })
  async findAll(@Query() query: FindTasksQueryDto) {
    return lastValueFrom(this.taskService.send('tasks.findAll', query));
  }

  /**
   * Busca uma tarefa pelo seu ID.
   * @param {string} id - ID da tarefa.
   * @returns {Promise<any>} Retorna a tarefa encontrada.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', example: 'uuid' })
  @ApiOkResponse({
    description: 'Task found',
    schema: {
      example: {
        id: 'uuid',
        title: 'Create logging system',
        status: 'DONE',
        comments: [
          {
            id: '123',
            text: 'Great progress!',
          },
        ],
        history: [
          {
            action: 'UPDATED',
            oldValue: '{}',
            newValue: '{}',
          },
        ],
        createdAt: '2025-12-01T15:30:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async findOne(@Param('id') id: string) {
    return lastValueFrom(this.taskService.send('tasks.findOne', id));
  }
  /**
   * Atualiza uma tarefa existente.
   * @param {string} id - ID da tarefa.
   * @param {UpdateTaskDto} dto - Dados para atualização.
   * @returns {Promise<any>} Retorna a tarefa atualizada.
   */
  @Patch(':id')
  @ApiBody({
    schema: {
      example: {
        title: 'Nova tarefa',
        description: 'Adicionando nova tarefa',
        dueDate: new Date(),
        priority: TaskPriority.HIGH,
        status: TaskStatus.IN_PROGRESS,
        assignedEmails: 'joao@email.com',
      },
    },
  })
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', example: 'uuid' })
  @ApiOkResponse({
    description: 'Task successfully updated',
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return lastValueFrom(this.taskService.send('tasks.update', { id, dto }));
  }

  /**
   * Remove uma tarefa pelo ID.
   * @param {string} id - ID da tarefa.
   * @returns {Promise<any>} Retorna confirmação de remoção.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', example: 'uuid' })
  @ApiOkResponse({
    description: 'Task removed',
    schema: { example: { message: 'Task removed' } },
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async remove(@Param('id') id: string) {
    return lastValueFrom(this.taskService.send('tasks.delete', id));
  }

  /**
   * Cria um comentário para uma tarefa específica.
   * @param {string} taskId - ID da tarefa.
   * @param {CreateCommentDto} dto - Dados do comentário.
   * @param {any} req - Objeto de requisição, para acessar o usuário autenticado.
   * @returns {Promise<any>} Retorna o comentário criado.
   */
  @Post(':id/comments')
  @ApiBody({
    schema: {
      example: {
        text: 'Novo comentário',
        authorId: 'uuid',
        authorEmail: 'joao@email.com',
      },
    },
  })
  @ApiOperation({ summary: 'Create a comment for a task' })
  @ApiCreatedResponse({
    description: 'Comment saved',
    schema: {
      example: {
        id: 'comment-uuid',
        text: 'Novo comentário',
        createdAt: '2025-12-03T16:00:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async createComments(
    @Param('id') taskId: string,
    @Body() dto: CreateCommentDto,
    @Req() req: any,
  ) {
    this.logger.log('Criação de caadstro checgou');
    return lastValueFrom(
      this.taskService.send('comment.new', {
        taskId,
        dto,
        email: req.user.email,
      }),
    );
  }

  /**
   * Lista comentários de uma tarefa com paginação.
   * @param {string} taskId - ID da tarefa.
   * @param {number} page - Página atual.
   * @param {number} limit - Número de itens por página.
   * @returns {Promise<any>} Retorna os comentários da tarefa.
   */
  @Get(':taskId/comments')
  @ApiOperation({ summary: 'List paginated comments from a task' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({
    description: 'Paginated comments',
    schema: {
      example: {
        data: [
          {
            id: 'comment-id',
            text: 'Important fix needed.',
          },
        ],
        currentPage: 1,
        limit: 10,
        total: 3,
        totalPages: 1,
      },
    },
  })
  async findCommentsByTask(
    @Param('taskId') taskId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return lastValueFrom(
      this.taskService.send('comments.findByTask', {
        taskId,
        page,
        limit,
      }),
    );
  }

  /**
   * Remove um comentário pelo seu ID.
   * @param {string} commentId - ID do comentário.
   * @returns {Promise<any>} Retorna confirmação de remoção.
   */
  @Delete(':taskId/comments/:commentId')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiParam({ name: 'taskId', example: 'uuid' })
  @ApiParam({ name: 'commentId', example: 'uuid' })
  @ApiOkResponse({
    description: 'Comment removed',
    schema: { example: { message: 'Comentário removido com sucesso' } },
  })
  @ApiNotFoundResponse({ description: 'Comentário não encontrado' })
  async removeComments(@Param('commentId') commentId: string) {
    return lastValueFrom(this.taskService.send('comments.remove', commentId));
  }
}
