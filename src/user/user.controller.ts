import { AuthGuard } from './../auth/auth.guard';
import {
  Body,
  Controller,
  Headers,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/user')
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this._userService.signup(createUserDto);
  }
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this._userService.login(loginDto);
  }
  @Post('/refresh')
  async refresh(@Headers('x-refresh') token: string) {
    return this._authService.refreshAccessToken(token);
  }
  @Post('/forgot-password')
  async forgot_password(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this._userService.forgot_password(forgotPasswordDto);
  }
  @Post('/reset-password')
  async reset_password(@Body() resetPasswordDto: ResetPasswordDto) {
    return this._userService.reset_password(resetPasswordDto);
  }
  @UseGuards(AuthGuard)
  @Patch('/change-password')
  async change_password(
    @Req() { user }: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this._userService.change_password(user.sub, changePasswordDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/update-profile')
  async update_profile(
    @Req() { user }: any,
    @Body() updateProfileDto: UpdateUserDto,
  ) {
    return this._userService.update_profile(user.sub, updateProfileDto);
  }
}
