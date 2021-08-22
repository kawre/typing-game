import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  users: string[];

  @Prop({ default: true })
  isSearching: boolean;

  @Prop()
  quote: string;

  @Prop()
  results: object[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
