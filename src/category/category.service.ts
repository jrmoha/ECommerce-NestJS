import {
  ConflictException,
  Injectable,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto, GetCategoryDto, UpdateCategoryDto } from './dto';
import { UploadApiOptions } from 'cloudinary';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { nanoid } from 'nanoid';
import { User, UserRole } from 'src/user/user.schema';
import { SearchCategoryDto } from './dto/search-category.dto';
import { CategorySearchQuery } from './helper/category-search-query-builder';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
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
      slug: name,
      image: { public_id, secure_url, url },
      addedBy: user_id,
      custom_id,
    });
  }
  async update_category(
    id: string,
    { name, addedBy }: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException('Category is not found');

    if (name && category.name != name) {
      if (await this.categoryModel.findOne({ name }))
        throw new ConflictException(
          `Category with name ${name} already exists`,
        );

      category.name = name;
    }

    if (addedBy) {
      const user = await this.userModel.findById(addedBy);
      if (!user || user.role !== UserRole.ADMIN)
        throw new NotFoundException('User not found');

      category.addedBy = addedBy;
    }
    if (file) {
      const upload_options: UploadApiOptions = {
        folder: `/nest/category/${category.custom_id}`,
        format: 'jpg',
        resource_type: 'image',
      };
      const { public_id, secure_url, url } =
        await this.cloudinaryService.uploadFile(file, upload_options);

      category.image = { public_id, secure_url, url };
    }
    if (category.isModified()) await category.save();
    return category;
  }
  async get_all() {
    return this.categoryModel.find().lean().select('-__v');
  }
  async get_category({ id }: GetCategoryDto) {
    return this.categoryModel.findById(id);
  }
  async search_categories(searchCategoryDto: SearchCategoryDto) {
    const CategorySearchQueryBuilderInstance = new CategorySearchQuery(
      searchCategoryDto,
    )
      .search()
      .paginate();
    const filter = CategorySearchQueryBuilderInstance.Filter;
    const [limit, offset] = CategorySearchQueryBuilderInstance.Paging;
    const sort = CategorySearchQueryBuilderInstance.Sort;

    return this.categoryModel
      .find(filter)
      .limit(limit)
      .skip(offset)
      .sort(sort)
      .lean();
  }
}
