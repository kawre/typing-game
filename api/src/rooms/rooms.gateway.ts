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
    const userId = socket.handshake.headers.user_id as string;
    const roomId = socket.handshake.headers.room_id as string;
    // await this.roomsService.clearDB();

    try {
      socket.join(roomId);
      // let hash: Record<string, number> = {};
      // hash[userId] = 0;
      this.server.in(roomId).emit('newUser', { userId, progress: 0 });
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @SubscribeMessage('progress')
  progress(socket: Socket, progress) {
    const userId = socket.handshake.headers.user_id;

    this.server
      .in(socket.handshake.headers.room_id)
      .emit('data', { userId, progress });
  }
}
