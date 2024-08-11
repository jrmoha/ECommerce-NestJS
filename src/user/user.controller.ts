import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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
  async change_password(@Body() resetPasswordDto: ResetPasswordDto) {
    return this._userService.reset_password(resetPasswordDto);
  }
}
