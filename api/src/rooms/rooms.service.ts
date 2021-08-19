import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsGateway } from './rooms.gateway';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  create() {
    const room = new this.roomModel();
    return room.save();
  }

  findAll() {
    return this.roomModel.find();
  }

  findOne(id: number) {
    return this.roomModel.find({});
  }

  findById(id: number) {
    return this.roomModel.findById(id);
  }

  findFirst() {
    return this.roomModel.findOne({ isSearching: true });
  }

  async joinRoom(roomId: string, userId: string) {
    const room = await this.roomModel.findById(roomId);

    if (!room.users.find((u) => u === userId)) {
      await room.updateOne({ $push: { users: userId } });
      room.users.push(userId);
    }

    return room.users;
  }

  update(id: string, input: any) {
    return this.roomModel.findByIdAndUpdate(id, input);
  }

  remove(id: string) {
    return this.roomModel.findByIdAndDelete(id);
  }

  clearDB() {
    return this.roomModel.remove({});
  }

  async udpateProgress(data, roomId) {
    return this.roomModel.updateOne(
      { _id: roomId },
      { usersProgress: { $push: 2 } },
    );
  }
}
