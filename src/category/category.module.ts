import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './category.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { User, UserSchema } from '../user/user.schema';
import { CategoryResolver } from './category.resolver';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
    ]),
    ConfigModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, AuthService, CategoryResolver, UserService],
})
export class CategoryModule {}
