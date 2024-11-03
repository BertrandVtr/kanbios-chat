import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          MonApp
        </div>

        {/* Menu Principal */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-blue-300">
            Accueil
          </a>
          <a href="#" className="text-white hover:text-blue-300">
            Services
          </a>
          <a href="#" className="text-white hover:text-blue-300">
            Contact
          </a>
          <NavLink to="/signIn" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Inscription
          </NavLink>
        </div>

        {/* Menu Utilisateur */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center text-white focus:outline-none"
          >
            <span className="mr-2">Utilisateur</span>
            <img
              src="https://via.placeholder.com/30"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profil
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Paramètres
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Déconnexion
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
