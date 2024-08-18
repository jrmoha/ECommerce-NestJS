import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { SubCategory, SubCategorySchema } from './sub-category.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Category, CategorySchema } from '../category/category.schema';
import { AuthService } from '../auth/auth.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { SubCategoryResolver } from './sub-category.resolver';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
    ]),
    ConfigModule,

    CloudinaryModule,
  ],
  controllers: [SubCategoryController],
  providers: [
    SubCategoryService,
    CategoryService,
    UserService,
    AuthService,
    CloudinaryService,
    SubCategoryResolver,
  ],
})
export class SubCategoryModule {}
