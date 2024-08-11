import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this._userService.signup(createUserDto);
  }
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this._userService.login(loginDto);
  }
}
