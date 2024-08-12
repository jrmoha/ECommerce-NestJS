import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
import { Match } from '../../decorators/match.decorator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  reset_code: string;

  @IsStrongPassword()
  password: string;

  @Match('password')
  password_confirmation: string;
}
