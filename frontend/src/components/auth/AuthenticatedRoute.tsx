import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks.ts';
import { selectIsAuthenticated } from '../../store/authSlice.ts';

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? children : <Navigate to="/logIn" />;
};