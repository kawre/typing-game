import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoomsGateway } from './rooms.gateway';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsGateway: RoomsGateway) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findRoom() {
    return { id: await this.roomsGateway.findRoom() };
  }
}
