import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SubCategory } from './sub-category.schema';
import { SubCategoryService } from './sub-category.service';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { Category } from 'src/category/category.schema';
import { User } from 'src/user/user.schema';

@Resolver(() => SubCategory)
export class SubCategoryResolver {
  constructor(
    private readonly subCategoryService: SubCategoryService,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [SubCategory])
  async findAllSubCategories() {
    return this.subCategoryService.findMany();
  }

  @ResolveField(() => Category)
  async category(@Parent() subCategory: SubCategory) {
    return this.categoryService.get_category({ id: subCategory.category });
  }

  @ResolveField(() => User)
  async addedBy(@Parent() subCategory: SubCategory) {
    return this.userService.get_user(subCategory.addedBy);
  }
}
