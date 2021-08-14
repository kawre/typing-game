import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Room {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: number;
}
