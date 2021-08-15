import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Response } from 'express';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async register({ password, ...input }: RegisterDto) {
    const exist = await this.userModel.find({
      $or: [{ username: input.username }, { email: input.email }],
    });
    if (exist !== [])
      throw new ConflictException('Username or Email already taken');

    const user = new this.userModel(input);
    user.password = await hash(password, 14);

    return user.save();
  }

  createToken(user: any) {
    return this.jwtService.sign({
      username: user.username,
      userId: user.id,
    });
  }

  async validateUser({ password, username }: LoginDto) {
    const user = await this.userModel.findOne({ username });
    if (!user) return null;

    const isValid = await compare(password, user.password);
    if (!isValid) return null;

    return user;
  }
}
