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

  handleDisconnect(socket: Socket) {
    console.log('porvalo');
  }

  @SubscribeMessage('findRoom')
  async findRoom(@MessageBody() userId: number) {
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
  async joinRoom(socket: Socket, room: string) {
    // await this.roomsService.remove(room);
    try {
      const roomData = await this.roomsService.joinRoom(room, 2);
      socket.join(room);
      this.server.in(room).emit('newUser', roomData);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  // @SubscribeMessage('leaveRoom')
  // leaveRoom(socket: Socket, room: string) {
  //   console.log('disc:', room);
  //   socket.disconnect();
  // }
}
