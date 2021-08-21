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
    await this.roomsService.clearDB();
    let room = await this.roomsService.findFirst();
    if (!room) room = await this.roomsService.create();

    return room.id;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(socket: Socket) {
    const { user, room }: any = socket.handshake.headers;

    try {
      socket.join(room);

      const roomData = await this.roomsService.joinRoom(room, user, () =>
        this.countdown(room),
      );

      this.server.in(room).emit('newUser', roomData);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  countdown(roomId: string) {
    let s = 5;

    const interval = setInterval(() => {
      this.server.in(roomId).emit('countdown', s);

      if (s <= 0) {
        clearInterval(interval);
        this.server.in(roomId).emit('gameStart');
        this.timer(roomId);
      }

      s--;
    }, 1000);
  }

  timer(roomId: string) {
    let s = 1;
    const interval = setInterval(() => {
      this.server.in(roomId).emit('timer', s);

      if (s >= 300) {
        clearInterval(interval);
        this.server.in(roomId).emit('endGame');
      }

      s++;
    }, 1000);
  }

  @SubscribeMessage('progress')
  progress(socket: Socket, progress: number) {
    const { user, room } = socket.handshake.headers;

    this.server.in(room).emit('data', { userId: user, progress });
  }
}
