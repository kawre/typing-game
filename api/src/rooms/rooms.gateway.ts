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
  async findRoom() {
    let room = await this.roomsService.findFirst();
    if (!room) room = await this.roomsService.create();

    return room.id;
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(socket: Socket, { roomId, userId }) {
    try {
      const room = await this.roomsService.findById(roomId);

      // if user is the first one to join the room,
      // start the countdown
      if (room.users.length < 1) {
        let counter = 10;
        this.server.in(roomId).emit('countdown');

        const interval = setInterval(async () => {
          if (counter < 1) {
            this.server.in(roomId).emit('startGame');

            setInterval(() => {
              this.server.in(roomId).emit('collect');
            }, 2000);

            clearInterval(interval);
          } else if (counter === 3) {
            await this.roomsService.update(roomId, { isSearching: false });
          }

          this.server.in(roomId).emit('timer', counter--);
        }, 1000);
      }

      // if user is not in this room,
      // append him
      if (!room.users.find((u) => u === userId)) {
        await room.updateOne({ $push: { users: userId } });
        room.users.push(userId);
      }

      // if everything went fine, join the room
      // and notify the users that new user has joined
      const data = room.users.map((u) => ({ progress: 0, userId: u }));
      socket.join(roomId);
      this.server.in(roomId).emit('newUser', data);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @SubscribeMessage('data')
  startGame(socket: Socket, data) {
    console.log(data);
    return this.roomsService.udpateProgress(data[0], data[1]);
  }
}
