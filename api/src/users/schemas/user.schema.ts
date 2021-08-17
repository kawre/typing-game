import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  @IsAlphanumeric()
  @MaxLength(16)
  @MinLength(3)
  username: string;

  @Prop({ unique: true })
  @IsEmail()
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ required: false })
  @IsUrl()
  avatar: string;

  @Prop({ default: true })
  @IsBoolean()
  isOnline: boolean;

  @Prop({ default: 0 })
  @Exclude()
  tokenVersion: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
