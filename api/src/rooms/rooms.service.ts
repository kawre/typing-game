import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  create(userId: string) {
    const room = new this.roomModel({ users: [userId] });
    return room.save();
  }

  findAll() {
    return this.roomModel.find();
  }

  findOne(id: number) {
    return this.roomModel.find({});
  }

  findFirst() {
    return this.roomModel.findOne({ isSearching: true });
  }

  async joinRoom(roomId: string, userId: string) {
    const { users, id } = await this.roomModel.findByIdAndUpdate(roomId, {
      $push: { users: userId },
    });

    return { users, id };
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: string) {
    return this.roomModel.findByIdAndDelete(id);
  }

  clearDB() {
    return this.roomModel.remove({});
  }
}
