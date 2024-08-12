import { IsStrongPassword } from 'class-validator';
import { Match } from '../../decorators/match.decorator';

export class ChangePasswordDto {
  @IsStrongPassword()
  new_password: string;

  @Match('new_password')
  new_password_confirmation: string;
}
