import { IsEmail } from 'class-validator';

export class AddAdminDto {
  @IsEmail()
  new_admin_email: string;
}
