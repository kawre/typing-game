import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsGateway } from './rooms.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [RoomsGateway, RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
