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
    const user = new this.userModel(input);

    user.password = await hash(input.password, 14);

    // let user;
    try {
      await user.save();
    } catch (err) {
      const field = Object.keys(err.keyValue);
      throw new ConflictException([`${field[0]} already taken`]);
    }
    return user;
  }

  createToken(user: any) {
    return this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '10m', secret: process.env.ACCESS_SECRET },
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
