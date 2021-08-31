import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  users(@Req() req: Request) {
    return this.usersService.findAll();
  }

  @Get(':id')
  user(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get(':id/config')
  async config(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    return user.config;
  }

  @Post(':id/config')
  updateConfig(@Param('id') id: string, @Body() body) {
    return this.usersService.update(id, { $set: { config: body } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
