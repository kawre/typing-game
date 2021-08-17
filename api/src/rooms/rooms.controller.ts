import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { RoomsGateway } from './rooms.gateway';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsGateway: RoomsGateway) {}

  @Get()
  async findRoom(@Req() req: Request) {
    const math = Math.floor(Math.random() * 100);

    return { id: this.roomsGateway.findRoom(math) };
  }
}
