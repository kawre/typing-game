import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
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

    try {
      user.save();
    } catch (err) {
      console.log('kekf');
      console.log(err);
      throw new ConflictException(err);
    }

    return user;
  }

  async login({ password, username }: LoginDto) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new UnauthorizedException('User not found');

    const isValid = await compare(password, user.password);
    if (!isValid) throw new ForbiddenException('Invalid password');

    return user;
  }
}
