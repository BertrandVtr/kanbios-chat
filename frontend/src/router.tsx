import { createBrowserRouter } from 'react-router-dom';
import PageLayout from './layouts/PageLayout.tsx';
import { LogInPage } from './pages/LogInPage.tsx';
import { SingInPage } from './pages/SingInPage.tsx';
import { AuthenticatedRoute } from './components/auth/AuthenticatedRoute.tsx';
import { UsersListingPage } from './pages/UsersListingPage.tsx';
import { FC } from 'react';
import { ChatPage } from './pages/ChatPage.tsx';
import { UserNotFound } from './components/users/UserNotFound.tsx';

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
    ],
  },
]);

export default router;