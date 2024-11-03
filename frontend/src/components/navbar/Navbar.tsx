import { useAppSelector } from '../../store/hooks.ts';
import { selectIsAuthenticated } from '../../store/auth/authSlice.ts';
import { NavbarUserMenu } from './NavbarUserMenu.tsx';

function Navbar() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          Kanbios Chat
        </div>
        {isAuthenticated && <NavbarUserMenu />}
      </div>
    </nav>
  );
}

export default Navbar;
