import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(16)
  @MinLength(3)
  username: string;

  @IsEmail()
  @MinLength(3)
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
}
