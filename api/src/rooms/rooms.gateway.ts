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
  async findRoom(@MessageBody() userId: string) {
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
  async joinRoom(
    socket: Socket,
    { roomId, userId }: { roomId: string; userId: string },
  ) {
    console.log(socket.request.headers.cookie);
    try {
      const roomData = await this.roomsService.joinRoom(roomId, userId);
      socket.join(roomId);
      this.server.in(roomId).emit('newUser', roomData);
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
