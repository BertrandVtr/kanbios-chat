import { Middleware } from '@reduxjs/toolkit';
import { setToken } from './authSlice.ts';
import apiClient from '../../api/apiClient.ts';

const jwtTokenMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (setToken.match(action)) {
    apiClient.interceptors.request.use((config) => {
      const token = store.getState().auth.token;
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });
  }

  return result;
};

export default jwtTokenMiddleware;
