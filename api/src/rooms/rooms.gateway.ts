import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import * as cookieParser from 'cookie';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/games',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class RoomsGateway implements OnGatewayDisconnect {
  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer() server: Server;

  handleDisconnect(socket: Socket) {}

  @SubscribeMessage('findRoom')
  async findRoom(@MessageBody() userId: number, ctx) {
    let room = await this.roomsService.findFirst();
    if (!room) room = await this.roomsService.create(userId);

    try {
      await this.roomsService.joinRoom(room.id, userId);
    } catch {
      return null;
    }

    return room.id;
  }

  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, room: string) {
    socket.join(room);
    this.server.in(room).emit('newUser', 39);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string) {
    console.log(room);
  }
}
