import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
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
export class RoomsGateway implements OnGatewayConnection {
  constructor(private readonly roomsService: RoomsService) {}
  @WebSocketServer() server: Server;

  handleConnection(socket: Socket, ...args: any[]) {
    // console.log(args);
    // throw new Error('Method not implemented.');
  }

  @SubscribeMessage('findRoom')
  async findRoom(@MessageBody() userId: string) {
    let room = await this.roomsService.findFirst();
    if (!room) room = await this.roomsService.create();

    return room.id;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(socket: Socket, { roomId, userId }) {
    try {
      const users = await this.roomsService.joinRoom(roomId, userId);
      socket.join(roomId);

      if (users.length === 1) {
        let counter = 10;
        this.server.in(roomId).emit('countdown');

        const interval = setInterval(() => {
          this.server.in(roomId).emit('timer', counter--);

          if (counter < 0) {
            socket.emit('startGame');
            clearInterval(interval);
          } else if (counter === 3) {
            this.roomsService.update(roomId, { isSearching: false });
          }
        }, 1000);
      }

      this.server.in(roomId).emit('newUser', users);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @SubscribeMessage('progress')
  leaveRoom(socket: Socket, progress: number) {
    // console.log('progress:', progress);
    // console.log(socket);
  }
}
