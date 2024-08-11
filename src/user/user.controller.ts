import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';

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
}
