import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  password: string;
}
