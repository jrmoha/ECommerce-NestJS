import { User } from './../user/user.schema';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Category } from './category.schema';
import { CategoryService } from './category.service';
import { UserService } from 'src/user/user.service';
import { GetCategoryDto } from './dto';
import { SearchCategoryDto } from './dto/search-category.dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Category])
  async get_all() {
    return this.categoryService.get_all();
  }

  @Query(() => Category, { nullable: true })
  async get_category(@Args('input') getCategoryDto: GetCategoryDto) {
    return this.categoryService.get_category(getCategoryDto);
  }
  @Query(() => [Category])
  async search_categories(@Args('input') searchCategoryDto: SearchCategoryDto) {
    return this.categoryService.search_categories(searchCategoryDto);
  }

  @ResolveField(() => User, { nullable: false })
  async addedBy(@Parent() category: Category) {
    return this.userService.get_user(category.addedBy);
  }
}
