import { FC } from 'react';
import { User } from '../../types/User.ts';

interface UserProfileProps {
  user: User;
}

export const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Nom</label>
        <p className="text-gray-900">{user?.lastName}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Prénom</label>
        <p className="text-gray-900">{user?.firstName}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Email</label>
        <p className="text-gray-900">{user?.email}</p>
      </div>
    </>
  );
};