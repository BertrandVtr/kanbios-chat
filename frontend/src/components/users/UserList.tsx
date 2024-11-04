import { User } from '../../types/User.ts';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks.ts';
import { selectAuthUser } from '../../store/auth/authSlice.ts';

export const UserList = ({ users }: { users: User[] }) => {
  return (
    <div>
      {users.map((user) => (<UserListItem user={user} key={user.id} />))}
    </div>
  );
};

const UserListItem = ({ user }: { user: User }) => {
  const authUser = useAppSelector(selectAuthUser);
  const fullName = useMemo(() => `${user.firstName} ${user.lastName}`, [user.firstName, user.lastName]);

  const chatAvailable = useMemo(() => user.id !== authUser?.id, [user, authUser]);

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <p className="text-lg font-medium">{fullName}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Link to={`/users/${user.id}`} className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">
          Profil
        </Link>
        {chatAvailable && (
          <Link
            to={`/chat/${user.id}`}
            className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
          >
            Chat
          </Link>
        )}

      </div>
    </div>
  );
};