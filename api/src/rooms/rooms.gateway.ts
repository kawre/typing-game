import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import * as cookieParser from 'cookie';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: 'http://localhost:8000', credentials: true },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer() server: Server;

  async handleConnection(socket) {
    const cookie = cookieParser.parse(socket.request.headers.cookie || '');
    console.log(cookie);
  }

  handleDisconnect(client: any) {
    console.log('disc');
  }

  @SubscribeMessage('createRoom')
  create(@MessageBody() createRoomDto: CreateRoomDto) {
    console.log(createRoomDto);
    return this.roomsService.create(createRoomDto);
  }

  @SubscribeMessage('findRoom')
  async findRoom(@MessageBody() userId: number) {
    const room = await this.roomsService.findFirst();

    try {
      await this.roomsService.joinRoom(room.id, userId);
    } catch {
      return null;
    }

    return room.id;
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string) {
    client.leave(room);
  }
}
