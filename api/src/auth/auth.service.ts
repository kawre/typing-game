import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register({ password, ...input }: RegisterDto) {
    const user = new this.userModel(input);

    user.password = await hash(password, 14);

    return user.save();
  }

  async login({ password, username }: LoginDto) {
    const user = await this.userModel.findOne({ username });

    console.log(user);

    return user;
  }
}
