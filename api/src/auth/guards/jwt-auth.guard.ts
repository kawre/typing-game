import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  handleRequest(err, user, info: Error, ctx) {
    if (info && info.message === 'jwt expired') {
      const tkn = ctx.getRequest().cookies.jwt;

      // const valid = this.jwtService.verify(tkn, {
      //   secret: process.env.REFRESH_SECRET,
      // });
      // console.log(valid);

      console.log('token expired');
      throw new UnauthorizedException('');
    } else if (err || !user) throw err || new UnauthorizedException();

    return user;
  }
}
