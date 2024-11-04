import { createBrowserRouter } from 'react-router-dom';
import PageLayout from './layouts/PageLayout.tsx';
import { LogInPage } from './pages/auth/LogInPage.tsx';
import { SingInPage } from './pages/auth/SingInPage.tsx';
import { AuthenticatedRoute } from './components/auth/AuthenticatedRoute.tsx';
import { UsersListingPage } from './pages/users/UsersListingPage.tsx';
import { FC } from 'react';
import { ChatPage } from './pages/chat/ChatPage.tsx';
import { UserNotFound } from './components/users/UserNotFound.tsx';
import { UserProfilePage } from './pages/users/UserProfilePage.tsx';

const authProtected = (RouteComponent: FC) => {
  return (
    <AuthenticatedRoute>
      <RouteComponent />
    </AuthenticatedRoute>
  );
};

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: '*',
        element: authProtected(UsersListingPage),
      },
      { path: '/logIn', element: <LogInPage /> },
      { path: '/signIn', element: <SingInPage /> },
      { path: '/chat/:userId', element: authProtected(ChatPage), errorElement: <UserNotFound /> },
      { path: '/users/:userId', element: authProtected(UserProfilePage), errorElement: <UserNotFound /> },
    ],
  },
]);

export default router;