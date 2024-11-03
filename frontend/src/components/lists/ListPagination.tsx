import { Pagination } from '../../types/Paginated.ts';

interface ListPaginationProps {
  pagination: Pagination;
  nextPage: () => void;
  previousPage: () => void;
}

export const ListPagination = ({ pagination, nextPage, previousPage }: ListPaginationProps) => {
  return (
    <>
      {
        pagination.lastPage > 1 &&
        <div className="mt-8 flex justify-center gap-6">
          <button
            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={pagination.currentPage === 1}
            onClick={() => previousPage()}
          >
            prev page
          </button>
          <span className="px-3 py-1 rounded-3xl bg-gray-300">{pagination.currentPage}</span>
          <button
            className="px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={pagination.currentPage === pagination.lastPage}
            onClick={() => nextPage()}
          >
            next page
          </button>
        </div>
      }
    </>
  );
};