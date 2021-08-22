import {
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

      const { isSearching, users, quote } = await this.roomsService.joinRoom(
        room,
        user,
        () => this.countdown(room),
      );

      if (!isSearching) return false;

      this.server.in(room).emit('newUser', { users, quote });
      return true;
    } catch {
      return false;
    }
  }

  async countdown(roomId: string) {
    let s = 6;

    const interval = setInterval(async () => {
      s--;

      if (s <= 0) {
        clearInterval(interval);
        this.server.in(roomId).emit('gameStart', 300);
        this.timer(roomId);
        await this.roomsService.update(roomId, { isSearching: false });
      }

      this.server.in(roomId).emit('countdown', s);
    }, 1000);
  }

  timer(roomId: string) {
    let s = 0;
    const interval = setInterval(() => {
      s++;

      if (s >= 300) {
        clearInterval(interval);
        this.server.in(roomId).emit('endGame');
      }

      this.server.in(roomId).emit('timer', s);
    }, 1000);
  }

  @SubscribeMessage('progress')
  progress(socket: Socket, { progress, wpm }) {
    const { user, room } = socket.handshake.headers;

    this.server.in(room).emit('data', { userId: user, progress, wpm });
  }

  @SubscribeMessage('result')
  async result(socket: Socket, { wpm }) {
    const { user, room } = socket.handshake.headers;

    try {
      const { place } = await this.roomsService.submitResult(room, {
        wpm,
        userId: user,
      });

      this.server.in(room).emit('data', {
        userId: user,
        progress: 100,
        wpm: Math.round(wpm),
        place,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}
