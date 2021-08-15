import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
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
    return this.jwtService.sign(
      {
        username: user.username,
        userId: user.id,
      },
      { expiresIn: '15s', secret: process.env.ACCESS_SECRET },
    );
  }

  createRefreshToken(user: any) {
    return this.jwtService.sign(
      {
        username: user.username,
        userId: user.id,
      },
      { expiresIn: '7d', secret: process.env.REFRESH_SECRET },
    );
  }

  async validateUser({ password, username }: LoginDto) {
    const user = await this.userModel.findOne({ username });
    if (!user) return null;

    const isValid = await compare(password, user.password);
    if (!isValid) return null;

    return user;
  }
}
