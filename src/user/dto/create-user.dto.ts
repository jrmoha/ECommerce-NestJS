import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../decorators/match.decorator';
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  first_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  last_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @Match('password')
  @IsNotEmpty()
  password_confirmation: string;
}
