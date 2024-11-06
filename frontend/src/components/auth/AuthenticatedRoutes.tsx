import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { logout, selectIsAuthenticated } from '../../store/auth/authSlice.ts';
import { Outlet } from 'react-router';
import { useEffect } from 'react';
import apiClient from '../../api/apiClient.ts';

export const AuthenticatedRoutes = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interceptorId = apiClient.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401) {
          await dispatch(logout());
          navigate('/login');
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiClient.interceptors.response.eject(interceptorId);
    };
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};