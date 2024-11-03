import Navbar from './Navbar';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-4 bg-gray-100">
        <Outlet />
      </main>

      <footer className="bg-blue-600 text-white text-center py-4">
        &copy; 2024 MonApp. Tous droits réservés.
      </footer>
    </div>
  );
}

export default Layout;
