import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.ts';
import jwtTokenMiddleware from './jwtTokenMiddleware.ts';

const reducer = { auth: authSlice };

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jwtTokenMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
