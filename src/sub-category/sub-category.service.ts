import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from './sub-category.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateSubCategoryDto } from './dto';
import { Category } from 'src/category/category.schema';
import { nanoid } from 'nanoid';
import { UploadApiOptions } from 'cloudinary';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategory>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async add_subCategory(
    user_id: string,
    { category, name }: CreateSubCategoryDto,
    image: Express.Multer.File,
  ) {
    if (await this.subCategoryModel.findOne({ name }))
      throw new ConflictException(`SubCategory ${name} already exists`);

    const category_ = await this.categoryModel.findById(category);
    if (!category_)
      throw new NotFoundException(`Category with id ${category} doesn't exist`);

    const custom_id = nanoid(6);
    const upload_options: UploadApiOptions = {
      folder: `/nest/category/${category_.custom_id}/subCategory/${custom_id}`,
      format: 'jpg',
      resource_type: 'image',
    };
    const { public_id, secure_url, url } =
      await this.cloudinaryService.uploadFile(image, upload_options);

    return this.subCategoryModel.create({
      name,
      image: { public_id, secure_url, url },
      addedBy: user_id,
      custom_id,
      category,
      slug: name,
    });
  }
  async findMany() {
    return this.subCategoryModel.find({}).lean();
  }
}
