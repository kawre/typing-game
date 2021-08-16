import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import * as cookieParser from 'cookie-parser';

@WebSocketGateway({
  cors: { origin: 'http://localhost:8000', credentials: true },
})
export class RoomsGateway {
  constructor(private readonly roomsService: RoomsService) {}

  handleConnection(socket) {
    const cookie = cookieParser.JSONCookie(socket.request.headers.cookie || '');
  }

  handleDisconnect() {
    console.log('disc');
  }

  @SubscribeMessage('createRoom')
  create(@MessageBody() createRoomDto: CreateRoomDto) {
    console.log(createRoomDto);
    console.log('porvalo');
    return this.roomsService.create(createRoomDto);
  }

  @SubscribeMessage('connection')
  onConnection() {
    return 'isOnline';
    // return this.roomsService.findAll();
  }

  @SubscribeMessage('disconnect')
  onDisconnect() {
    return 'false';
    // return this.roomsService.findAll();
  }

  @SubscribeMessage('findOneRoom')
  findOne(@MessageBody() id: number) {
    return this.roomsService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  update(@MessageBody() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(updateRoomDto.id, updateRoomDto);
  }

  @SubscribeMessage('removeRoom')
  remove(@MessageBody() id: number) {
    return this.roomsService.remove(id);
  }
}
