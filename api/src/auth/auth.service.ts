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

  async register(input: RegisterDto) {
    input.password = await hash(input.password, 14);

    console.log(input);

    try {
      return this.userModel.create(input);
    } catch (err) {
      // console.log(err);
      return 'siema';
      // throw new ConflictException('Username or Email already taken');
    }
  }

  createToken(user: any) {
    return this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '15s', secret: process.env.ACCESS_SECRET },
    );
  }

  async createRefreshToken(user: any) {
    return this.jwtService.sign(
      { userId: user.id, tokenVersion: user.tokenVersion },
      { expiresIn: '7d', secret: process.env.REFRESH_SECRET },
    );
  }

  validateRefreshToken(tkn: string) {
    return this.jwtService.verify(tkn, { secret: process.env.REFRESH_SECRET });
  }

  async validateUser({ password, username }: LoginDto) {
    const user = await this.userModel.findOne({ username });
    if (!user) return null;

    const isValid = await compare(password, user.password);
    if (!isValid) return null;

    return user;
  }
}
