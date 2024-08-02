import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/user')
export class UserController {
  @Post('/create-user')
  async signup(@Body() createUserDto:CreateUserDto) {
    console.log(createUserDto);
    
    return 'Hello, from signup';
  }
}
