export interface Pagination {
  total: number;
  currentPage: number;
  lastPage: number;
  limit: number;
}

export interface Paginated<T> extends Pagination {
  data: T[];
}