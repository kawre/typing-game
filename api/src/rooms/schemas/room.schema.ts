import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ArrayMaxSize, IsBoolean } from 'class-validator';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ validateBeforeSave: true })
export class Room {
  @Prop()
  @ArrayMaxSize(4)
  users: number[];

  @Prop()
  isSearching: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
