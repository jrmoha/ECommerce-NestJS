import {
  Body,
  Controller,
  Headers,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TrimPipe } from '../pipes/trim.pipe';

@Controller('/user')
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(@Body(TrimPipe) createUserDto: CreateUserDto) {
    return this._userService.signup(createUserDto);
  }
  @Post('/login')
  async login(@Body(TrimPipe) loginDto: LoginDto) {
    return this._userService.login(loginDto);
  }
  @Post('/refresh')
  async refresh(@Headers('x-refresh') token: string) {
    return this._authService.refreshAccessToken(token);
  }
  @Post('/forgot-password')
  async forgot_password(@Body(TrimPipe) forgotPasswordDto: ForgotPasswordDto) {
    return this._userService.forgot_password(forgotPasswordDto);
  }
  @Post('/reset-password')
  async reset_password(@Body(TrimPipe) resetPasswordDto: ResetPasswordDto) {
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
    @Body(TrimPipe) updateProfileDto: UpdateUserDto,
  ) {
    console.log(updateProfileDto);

    return this._userService.update_profile(user.sub, updateProfileDto);
  }

  @Patch('/change-profile-image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  change_profile_image(
    @Req() { user }: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this._userService.update_profile_image(user.sub, file);
  }
}
