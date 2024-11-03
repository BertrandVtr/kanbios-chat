import { MouseEvent, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { logout as logoutAction, selectAuthUser } from '../../store/authSlice.ts';
import { User } from '../../types/User.ts';

export const NavbarUserMenu = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser) as User;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  function logout(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(logoutAction());
  }

  const fullName = useMemo(() => `${authUser.firstName} ${authUser.lastName}`, [authUser]);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center text-white focus:outline-none"
      >
        <span className="mr-2">{fullName}</span>
        <img
          src="https://via.placeholder.com/50"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
          <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left" onClick={logout}>
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};