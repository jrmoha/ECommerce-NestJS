import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { AuthGuard } from '../auth/guard/auth.guard';
import { SearchUserDto } from './dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuard)
  async user(@Args('id') id: string) {
    return this.userService.get_user(id);
  }
  @Query(() => [User], { nullable: true })
  @UseGuards(AuthGuard)
  async search_users(@Args('input') input: SearchUserDto) {
    return this.userService.search(input);
  }
}
