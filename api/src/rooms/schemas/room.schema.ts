import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ArrayMaxSize } from 'class-validator';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  @ArrayMaxSize(5)
  users: number[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
