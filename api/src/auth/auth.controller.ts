import {
  Body,
  Controller,
  Res,
  Post,
  Put,
  Req,
  UseGuards,
  Get,
  UnauthorizedException,
  GoneException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() input: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.register(input);
    if (!user) return;

    const tkn = await this.authService.createRefreshToken(user);

    res.cookie('jwt', tkn, { httpOnly: true });

    return {
      accessToken: this.authService.createToken(user),
    };
  }

  @UseGuards(LocalAuthGuard)
  @Put('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const tkn = await this.authService.createRefreshToken(req.user);

    res.cookie('jwt', tkn, { httpOnly: true });

    return {
      accessToken: this.authService.createToken(req.user),
    };
  }

  @Get('me')
  async me(@Req() req: Request) {
    let tkn: any;
    try {
      tkn = this.authService.validateRefreshToken(req.cookies.jwt);
    } catch {
      throw new UnauthorizedException();
    }

    return this.usersService.findById(tkn.userId);
  }

  @Get('token/refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    let tkn: any;
    try {
      tkn = this.authService.validateRefreshToken(req.cookies.jwt);
    } catch (err) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findById(tkn.userId);
    if (!user) throw new GoneException();

    res.cookie('jwt', await this.authService.createRefreshToken(user), {
      httpOnly: true,
    });

    return {
      accessToken: this.authService.createToken(user),
    };
  }
}
