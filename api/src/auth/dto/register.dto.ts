import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsAlphanumeric()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
