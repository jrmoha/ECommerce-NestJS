import { IsEmail, IsStrongPassword } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class ChangePasswordDto {
  @IsStrongPassword()
  new_password: string;

  @Match('new_password')
  new_password_confirmation: string;
}
