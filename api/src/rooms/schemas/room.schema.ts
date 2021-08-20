import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ validateBeforeSave: true })
export class Room {
  @Prop()
  users: string[];

  @Prop()
  isSearching: boolean;

  @Prop({ default: [] })
  usersProgress: {}[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
