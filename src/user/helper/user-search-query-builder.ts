import { FilterQuery, SortOrder } from 'mongoose';
import { SearchUserDto } from '../dto';
import { User } from '../user.schema';
import { SearchQueryBuilder } from 'src/common/QueryBuilder';

export class SearchUserQuery implements SearchQueryBuilder<User> {
  private readonly filter: FilterQuery<User>;
  private readonly searchInput: SearchUserDto;
  private limit: number;
  private offset: number;
  private sort: Record<string, SortOrder>;

  constructor(searchInput: SearchUserDto) {
    this.filter = {};
    this.searchInput = searchInput;
  }

  search() {
    if (this.searchInput.username)
      this.filter.username = {
        $regex: this.searchInput.username,
        $options: 'i',
      };

    if (this.searchInput.email)
      this.filter.email = { $regex: this.searchInput.email, $options: 'i' };

    if (this.searchInput.firstName)
      this.filter.firstName = {
        $regex: this.searchInput.firstName,
        $options: 'i',
      };

    if (this.searchInput.lastName)
      this.filter.lastName = {
        $regex: this.searchInput.lastName,
        $options: 'i',
      };

    return this;
  }
  paginate() {
    this.limit = this.searchInput.pagination?.limit ?? 10;
    this.offset = this.searchInput.pagination?.offset ?? 0;
    return this;
  }
  get Sort() {
    return this.sort;
  }
  get Filter() {
    return this.filter;
  }
  get Paging(): [number, number] {
    return [this.limit, this.offset];
  }
}
