import { createBrowserRouter } from 'react-router-dom';
import { LogInPage } from './pages/auth/LogInPage.tsx';
import { SingInPage } from './pages/auth/SingInPage.tsx';
import { AuthenticatedRoutes } from './components/auth/AuthenticatedRoutes.tsx';
import { ChatPage } from './pages/chat/ChatPage.tsx';
import { UserNotFound } from './components/users/UserNotFound.tsx';
import { UserProfilePage } from './pages/users/UserProfilePage.tsx';
import { UsersListingPage } from './pages/users/UsersListingPage.tsx';
import { App } from './App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <AuthenticatedRoutes />,
        children: [
          { path: '', element: <UsersListingPage /> },
          { path: '/chat/:userId', element: <ChatPage />, errorElement: <UserNotFound /> },
          { path: '/users/:userId', element: <UserProfilePage />, errorElement: <UserNotFound /> },
        ],
      },

      { path: '/logIn', element: <LogInPage /> },
      { path: '/signIn', element: <SingInPage /> },
    ],
  },
]);

export default router;