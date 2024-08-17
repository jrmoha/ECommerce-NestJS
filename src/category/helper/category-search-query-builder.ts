import { FilterQuery, SortOrder } from 'mongoose';
import { Category } from '../category.schema';
import { SearchCategoryDto } from '../dto/search-category.dto';

export class CategorySearchQueryBuilder {
  private readonly filter: FilterQuery<Category>;
  private readonly searchInput: SearchCategoryDto;
  private limit: number;
  private offset: number;
  private sort: Record<string, SortOrder>;

  constructor(searchInput: SearchCategoryDto) {
    this.filter = {};
    this.searchInput = searchInput;
  }
  search() {
    if (this.searchInput.name) {
      this.filter.name = { $regex: this.searchInput.name, $options: 'i' };
    }
    if (this.searchInput.addedBy) {
      this.filter.addedBy = this.searchInput.addedBy;
    }
    if (this.searchInput.order) {
      const direction = this.searchInput.order.orderDirection;
      this.sort = {
        [this.searchInput.order.orderBy]: direction as SortOrder,
      };
    }
    return this;
  }
  paginate() {
    this.limit = this.searchInput.pagination?.limit ?? 10;
    this.offset = this.searchInput.pagination?.offset ?? 0;
    return this;
  }
  get Filter() {
    return this.filter;
  }
  get Paging() {
    return [this.limit, this.offset];
  }
  get Sort() {
    return this.sort;
  }
}
