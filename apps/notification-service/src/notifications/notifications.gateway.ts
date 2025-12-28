import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

/**
 * WebSocket gateway para notificações.
 * Permite conexão de clientes via WebSocket e envio de eventos em tempo real.
 */
@WebSocketGateway({ path: '/ws', cors: true })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private clients = new Map<string, WebSocket>();

  /**
   * Método chamado quando um cliente se conecta.
   * @param {WebSocket} client - Cliente que se conectou.
   * @param {any} req - Requisição HTTP inicial do cliente.
   */
  handleConnection(client: WebSocket, req: any) {
    const params = new URL(req.url, 'http://localhost');
    const email = params.searchParams.get('email');
    if (!email) {
      client.close();
      return;
    }

    const existing = this.clients.get(email);
    if (existing && existing.readyState === WebSocket.OPEN) {
      existing.close();
    }

    (client as any).email = email;
    this.clients.set(email, client);
  }

  /**
   * Método chamado quando um cliente se desconecta.
   */
  handleDisconnect(client: WebSocket) {
    const email = (client as any).email;
    if (email) {
      this.clients.delete(email);
    }
  }

  /**
   * Envia mensagem para todos os clientes conectados.
   * @param {string} event - Nome do evento.
   * @param {any} data - Payload do evento.
   */
  broadcast(event: string, data: any) {
    const payload = JSON.stringify({ type: event, payload: data });
    console.log('Broadcast: ', payload);
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  /**
   * Envia mensagem apenas para clientes específicos.
   * @param {string} event - Nome do evento.
   * @param {any} data - Payload do evento.
   * @param {string[]} recipients - Lista de emails de destinatários.
   */
  broadcastToClient(event: string, data: any, recipients: string[]) {
    const payload = JSON.stringify({ type: event, payload: data });

    recipients.forEach((email) => {
      const client = this.clients.get(email);
      if (client?.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }
}
