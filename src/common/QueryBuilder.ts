import { FilterQuery, SortOrder } from 'mongoose';

export interface SearchQueryBuilder<T> {
  search: () => this;
  paginate: () => this;
  Filter: FilterQuery<T>;
  Paging: [number, number];
  Sort: Record<string, SortOrder>;
}
