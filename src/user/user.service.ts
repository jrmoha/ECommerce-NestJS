import { ChangePasswordDto } from './dto/change-password.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { nanoid } from 'nanoid';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async signup(user: CreateUserDto) {
    const user_exists = await this.User.findOne({
      $or: [{ username: user.username }, { email: user.email }],
    });
    if (user_exists) {
      const field_exists =
        user_exists.username == user.username ? 'Username' : 'Email';
      throw new ConflictException(`This ${field_exists} Already Registered`);
    }

    return this.User.create({ ...user, confirmed: true });
  }
  async login({ email, password }: LoginDto) {
    const user = await this.User.findOne({ email });
    if (!user || !user.confirmed)
      throw new NotFoundException(
        `Email ${email} not found or user is not confirmed`,
      );

    const isMatch = await user.compare_password(password);
    if (!isMatch) throw new UnauthorizedException('Invalid Password');

    const access_token = this.authService.signAccessToken(user);
    const refresh_token = this.authService.signRefreshToken(user);
    return { access_token, refresh_token };
  }
  async forgot_password({ email }: ForgotPasswordDto) {
    const user = await this.User.findOne({ email });
    if (!user || !user.confirmed)
      throw new NotFoundException(`Email ${email} not found`);

    if (user.password_reset_at) {
      const diff = new Date().getTime() - user.password_reset_at.getTime();
      const diff_minutes = Math.floor(diff / 60000);
      if (diff_minutes < 5)
        throw new BadRequestException('Password reset code already sent');
    }
    const reset_code = nanoid(6);
    user.password_reset_code = reset_code;
    user.password_reset_at = new Date();
    await user.save();

    return { reset_code };
  }
  async reset_password({ email, reset_code, password }: ResetPasswordDto) {
    const user = await this.User.findOne({ email });
    if (!user || !user.confirmed)
      throw new NotFoundException(`Email ${email} not found`);

    if (!user.password_reset_code)
      throw new BadRequestException(`No Reset Code`);

    const diff = new Date().getTime() - user.password_reset_at.getTime();
    const diff_minutes = Math.floor(diff / 60000);

    if (diff_minutes > 5 || user.password_reset_code !== reset_code)
      throw new BadRequestException(
        'Password reset code already expired, Please request another one',
      );

    user.password = password;
    user.password_reset_code = null;
    user.password_reset_at = null;
    await user.save();

    const access_token = this.authService.signAccessToken(user);
    const refresh_token = this.authService.signRefreshToken(user);
    return { access_token, refresh_token };
  }
  async change_password(user_id: string, { new_password }: ChangePasswordDto) {
    const user = await this.User.findById(user_id);
    if (!user || !user.confirmed) throw new NotFoundException('User not found');

    user.password = new_password;
    user.password_changed_at = new Date();
    await user.save();

    const access_token = this.authService.signAccessToken(user);
    const refresh_token = this.authService.signRefreshToken(user);
    return { access_token, refresh_token };
  }
  async update_profile(
    user_id: string,
    { username, email, first_name, last_name }: UpdateUserDto,
  ) {
    const user = await this.User.findById(user_id);
    if (!user || !user.confirmed) throw new NotFoundException('User not found');

    if (username || email) {
      const propery_exists = await this.User.findOne({
        $or: [{ email }, { username }],
        _id: { $ne: user_id },
      }).select('_id username email');

      if (propery_exists) {
        let err_message: string;

        if (propery_exists.username === username)
          err_message = `username ${username} already exists`;
        else err_message = `email ${email} already exists`;

        throw new ConflictException(err_message);
      }
    }

    username && (user.username = username);
    email && (user.email = email);
    first_name && (user.first_name = first_name);
    last_name && (user.last_name = last_name);

    if (!user.isModified())
      throw new BadRequestException(`No Updates have been made`);

    await user.save();

    const access_token = this.authService.signAccessToken(user);
    const refresh_token = this.authService.signRefreshToken(user);
    return { access_token, refresh_token };
  }
}
