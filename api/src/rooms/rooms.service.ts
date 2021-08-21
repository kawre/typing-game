import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote } from './schemas/quote.schema';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Quote.name) private quoteModel: Model<Quote>,
  ) {}

  async create() {
    const room = new this.roomModel();
    const model = await this.quoteModel.aggregate([{ $sample: { size: 1 } }]);
    room.quote = model[0].quote;

    return room.save();
  }

  findAll() {
    return this.roomModel.find({});
  }

  findOne(id: number) {
    return this.roomModel.find({});
  }

  findById(id: string) {
    return this.roomModel.findById(id);
  }

  findFirst() {
    return this.roomModel.findOne({ isSearching: true });
  }

  async joinRoom(roomId: string, userId: string, fn: () => void) {
    const room = await this.roomModel.findById(roomId);

    if (room.users.length <= 0) fn();

    if (!room.users.find((u) => u === userId)) {
      await room.updateOne({ $push: { users: userId } });

      room.users.push(userId);
    }

    return { users: room.users, quote: room.quote };
  }

  update(id: string, input: any) {
    return this.roomModel.findByIdAndUpdate(id, input);
  }

  remove(id: string) {
    return this.roomModel.findByIdAndDelete(id);
  }

  clearDB() {
    return this.roomModel.deleteMany({});
  }

  async udpateProgress(roomId: string, data) {
    return this.roomModel.findByIdAndUpdate(roomId, {
      $where: `usersProgress.userId === ${data.userId}`,
      $push: { 'usersProgress.progress': '2' },
    });
  }
}
