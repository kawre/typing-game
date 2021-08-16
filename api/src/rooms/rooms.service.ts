import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  create(createRoomDto: CreateRoomDto) {
    const room = new this.roomModel(createRoomDto);
    return room.save();
  }

  findAll() {
    return this.roomModel.find();
  }

  findOne(id: number) {
    return this.roomModel.find({});
  }

  findFirst() {
    return this.roomModel.findOne();
  }

  joinRoom(_id: string, userId: number) {
    return this.roomModel.updateOne({ _id }, { $push: { users: userId } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
