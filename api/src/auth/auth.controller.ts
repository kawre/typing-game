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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() input: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.register(input);
    if (!user) return;

    const tkn = this.authService.createRefreshToken(user);

    res.cookie('jwt', tkn, { httpOnly: true });

    return {
      accessToken: this.authService.createToken(user),
    };
  }

  @UseGuards(LocalAuthGuard)
  @Put('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const tkn = this.authService.createRefreshToken(req.user);

    res.cookie('jwt', tkn, { httpOnly: true });

    return {
      accessToken: this.authService.createToken(req.user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh_token')
  async refreshToken(@Req() req: Request) {
    console.log(req.user);
    const valid = this.authService.validateRefreshToken(req.cookies.jwt);
    if (!valid) throw new UnauthorizedException();

    return {
      accessToken: 'kekf',
    };
  }
}
