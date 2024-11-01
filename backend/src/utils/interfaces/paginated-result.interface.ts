export interface PaginatedResult<T> {
  data: T[];
  total: number;
  currentPage: number;
  lastPage: number;
  limit: number;
}
