import { FC, useMemo, useState } from 'react';
import { BackButton } from '../../components/utils/BackButton.tsx';
import { useRouteUser } from '../../hooks/useRouteUser.ts';
import { UserProfile } from '../../components/users/UserProfile.tsx';
import { UserForm } from '../../components/users/UserForm.tsx';
import { PencilIcon, XMarkIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';

export const UserProfilePage: FC = () => {
  const [user, fetchUser] = useRouteUser();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  async function onSuccess() {
    await fetchUser();
    toggleEditing();
  }

  return (
    <>
      <BackButton to="/" />
      <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg">
        <div className="flex mb-4 items-baseline gap-4">
          <h2 className="text-2xl font-bold">Profil de l'utilisateur</h2>
          <EditionButton isEditing={isEditing} onClick={toggleEditing} />
        </div>
        {user && (isEditing ? <UserForm user={user} onSuccess={onSuccess} /> : <UserProfile user={user} />)}
      </div>
    </>
  );
};

interface ButtonProps {
  isEditing: boolean;
  onClick?: () => void;
}

const EditionButton: FC<ButtonProps> = ({ onClick, isEditing }) => {
  const label = useMemo(() => isEditing ? 'Annuler l\'édition' : 'Éditer le profil', [isEditing]);
  const icon = useMemo(() => isEditing ? <XMarkIcon className="h-5 w-5" /> : <PencilIcon className="h-5 w-5" />, [isEditing]);
  const buttonClass = useMemo(() => clsx(
      'inline-flex gap-2 items-center px-4 py-2 rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-200',
      isEditing
        ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
        : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400',
    ),
    [isEditing]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={buttonClass}
    >
      {icon}
      {label}
    </button>
  );
};
