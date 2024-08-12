import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @IsOptional()
  first_name?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  last_name?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
