import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto';
import { UploadApiOptions } from 'cloudinary';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { nanoid } from 'nanoid';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async add_category(
    user_id: string,
    { name }: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const custom_id = nanoid(6);

    const upload_options: UploadApiOptions = {
      folder: `/nest/category/${custom_id}`,
      format: 'jpg',
      resource_type: 'image',
    };

    const { public_id, secure_url, url } =
      await this.cloudinaryService.uploadFile(file, upload_options);

    return this.categoryModel.create({
      name,
      slug:name,
      image: { public_id, secure_url, url },
      addedBy: user_id,
      custom_id,
    });
  }
}
