import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ default: true })
  isOnline: boolean;

  @Prop({ default: 0 })
  @Exclude()
  tokenVersion: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
