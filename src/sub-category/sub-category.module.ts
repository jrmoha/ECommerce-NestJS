import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { SubCategory, SubCategorySchema } from './sub-category.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Category, CategorySchema } from '../category/category.schema';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    ConfigModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, AuthService, CloudinaryService],
})
export class SubCategoryModule {}
