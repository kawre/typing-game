import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';

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
    console.log(userId);
    let room = await this.roomsService.findFirst();
    if (!room) room = await this.roomsService.create(userId);

    return room.id;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    socket: Socket,
    { roomId, userId }: { roomId: string; userId: string },
  ) {
    // await this.roomsService.clearDB();
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
