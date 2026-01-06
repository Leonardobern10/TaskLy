import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { NotificationsGateway } from './notifications.gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entity/notification.entity';

/**
 * Serviço responsável pelo processamento de eventos de notificações.
 * Salva notificações no banco e envia para clientes via WebSocket.
 */
@Injectable()
export class NotificationsService {
  constructor(
    @Inject(Logger) private readonly logger: Logger,
    private readonly gateway: NotificationsGateway,
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  /**
   * Processa um evento recebido.
   * @param {string} type - Tipo do evento (ex: tasks.created, comment.new).
   * @param {any} data - Dados do evento.
   */
  async processEvent(type: string, data: any) {
    this.logger.log('Iniciou');
    try {
      const notification = this.notificationRepo.create({
        event: type,
        payload: data,
        userId: data?.userId ?? null,
      });
      // Salva no banco
      await this.notificationRepo.save(notification);
      this.logger.log(`Evento recebido e salvo: ${type}`);
      this.logger.debug(`Evento recebido e salvo: ${type}`);

      // Ignora se WS não inicializado
      if (!this.gateway.server) {
        this.logger.warn('WS server não inicializado, evento ignorado: ', type);
        return;
      }

      // Eventos de comentário enviam apenas para usuários atribuídos
      if (type === 'comment.new') {
        const recipients = (data.assignedEmails ?? []).filter(
          (email: string) => email !== data.author,
        );
        return this.gateway.broadcastToClient(
          'comment.new',
          {
            id: data.id,
            content: data.text,
            author: data.author,
            taskId: data.taskId,
            taskTitle: data.taskTitle,
            createdAt: data.createdAt,
          },
          recipients,
        );
      }

      // Demais eventos enviados para todos os clientes
      this.gateway.broadcast(type, {
        id: data.id,
        content: data.text,
        author: data.author,
        taskId: data.taskId,
        taskTitle: data.taskTitle,
        createdAt: data.createdAt,
      });
    } catch (error) {
      this.logger.error('Erro ao lançar notificação: ', error);
    }
  }
}
