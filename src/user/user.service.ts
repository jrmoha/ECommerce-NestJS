import {
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
}
