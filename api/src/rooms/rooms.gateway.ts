import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

@WebSocketGateway({
  namespace: '/games',
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class RoomsGateway {
  constructor(private readonly roomsService: RoomsService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('findRoom')
  async findRoom() {
    let room = await this.roomsService.findFirst();
    if (!room) room = await this.roomsService.create();

    return room.id;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(socket: Socket) {
    const { user, room }: any = socket.handshake.headers;

    try {
      socket.join(room);
      const users = await this.roomsService.joinRoom(room, user);
      this.server.in(room).emit('newUser', users);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @SubscribeMessage('progress')
  progress(socket: Socket, progress: number) {
    const { user, room } = socket.handshake.headers;

    this.server.in(room).emit('data', { userId: user, progress });
  }
}
