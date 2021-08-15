import {
  Body,
  Controller,
  Res,
  Post,
  Put,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() input: RegisterDto) {
    return this.authService.register(input);
  }

  @UseGuards(LocalAuthGuard)
  @Put('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const tkn = this.authService.createRefreshToken(req.user);

    res.cookie('jwt', tkn, { httpOnly: true });

    return {
      access_token: this.authService.createToken(req.user),
    };
  }

  @Get('refresh_token')
  async refreshToken(@Req() req: Request) {
    console.log(req.cookies.jwt);
  }
}
