import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserResolver } from './user.resolver';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserResolver, UserService, AuthService, CloudinaryService],
})
export class UserModule {}
