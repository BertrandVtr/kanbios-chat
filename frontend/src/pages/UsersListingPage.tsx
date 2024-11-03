import { UserList } from '../components/users/UserList.tsx';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Paginated } from '../types/Paginated.ts';
import { User } from '../types/User.ts';
import { ListPagination } from '../components/lists/ListPagination.tsx';
import { getUsers } from '../api/UsersApi.ts';
import { PlusIcon } from '@heroicons/react/16/solid';

export const UsersListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginatedUsers, setPaginatedUsers] = useState<Paginated<User>>();

  const page = +(searchParams.get('page') ?? 1);

  function nextPage() {
    if (!paginatedUsers || paginatedUsers.currentPage === paginatedUsers.lastPage) {
      return;
    }

    searchParams.set('page', (paginatedUsers.currentPage + 1).toString());
    setSearchParams(searchParams);
  }

  function prevPage() {
    if (!paginatedUsers || paginatedUsers.currentPage === 1) {
      return;
    }

    searchParams.set('page', (paginatedUsers.currentPage - 1).toString());
    setSearchParams(searchParams);
  }

  async function fetchUsers(page: number) {
    setPaginatedUsers(await getUsers(page));
  }

  useEffect(() => {
    fetchUsers(page);
  }, [page]);


  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold">Liste des utilisateurs</h2>
        <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-full w-8 h-8 inline-flex items-center justify-center">
          <PlusIcon className="size-6"></PlusIcon>
        </button>
      </div>
      {paginatedUsers
        ? (<UserList users={paginatedUsers.data} />)
        : (<p className="italic text-gray-600 text-center">Aucun utilisateur</p>)}
      {paginatedUsers && <ListPagination pagination={paginatedUsers} nextPage={nextPage} previousPage={prevPage} />}
    </>
  );
};