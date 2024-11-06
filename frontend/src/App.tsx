import { Outlet } from 'react-router';
import { useAppDispatch, useAppSelector } from './store/hooks.ts';
import { useEffect } from 'react';
import { bootApplication, selectIsBooted } from './store/auth/authSlice.ts';
import { Navbar } from './components/navbar/Navbar.tsx';
import { LoaderIcon } from './components/icons/LoaderIcon.tsx';

export const App = () => {
  const isBooted = useAppSelector(selectIsBooted);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bootApplication());
  }, []);


  if (!isBooted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className="h-16 w-16 text-blue-500 animate-spin" />
      </div>
    );
  }

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
};