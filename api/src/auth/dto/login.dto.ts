import {
  IsAlphanumeric,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsAlphanumeric()
  @MaxLength(16)
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  password: string;
}
