import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { AuthSocket } from './types/auth-socket.interface';
import { Message } from './schemas/message.schema';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ExtendedError } from 'socket.io/dist/namespace';
import { BadGatewayException } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayDisconnect {
  private connections: AuthSocket[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
  ) {}

  afterInit(server: Server): void {
    server.use(async (client: Socket, next: (err?: ExtendedError) => void) => {
      const token = client.handshake.auth.token;

      if (!token) {
        return next(new BadGatewayException('Missing Token'));
      }

      const user = await this.authService.verifyJWT(token);

      if (!user) {
        return next(new BadGatewayException('Invalid Token'));
      }

      client.data.user = user;
      this.connections.push(client);
      next();
    });
  }

  handleDisconnect(@ConnectedSocket() client: AuthSocket) {
    this.connections = this.connections.filter(({ id }) => id !== client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleNewMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: AuthSocket,
  ) {
    const message = await this.messageService.createMessage({
      senderId: client.data.user!.id,
      ...createMessageDto,
    });

    client.emit('receiveMessage', message);
    this.sendMessage(message);
  }

  @SubscribeMessage('getConversation')
  async getConversation(
    @MessageBody() receiverId: number,
    @ConnectedSocket() client: AuthSocket,
  ) {
    const messages = await this.messageService.getConversation(
      receiverId,
      client.data.user!.id,
    );

    client.emit('getConversation', messages);
  }

  private sendMessage(message: Message) {
    this.connections
      .filter(
        (socket: AuthSocket) => socket.data.user?.id === message.receiverId,
      )
      .forEach((socket: AuthSocket) => {
        socket.emit('receiveMessage', message);
      });
  }
}
