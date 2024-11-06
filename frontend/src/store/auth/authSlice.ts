import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User.ts';
import { login as loginApi, signIn as singInApi, verifyToken as verifyTokenApi } from '../../api/AuthApi.ts';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { LogInFormData } from '../../types/LogInFormData.ts';
import { SingInFormData } from '../../types/SingInFormData.ts';

interface AuthState {
  user: User | null;
  token: string | null;
  booted: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  booted: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload: token }: PayloadAction<string>) => {
      return {
        ...state,
        token,
      };
    },
    setAuthUser: (state, { payload: user }: PayloadAction<User | null>) => {
      return {
        ...state,
        user,
      };
    },
    clearAuth: (state) => {
      return {
        ...state,
        token: null,
        user: null,
      };
    },
    booted: (state) => {
      return {
        ...state,
        booted: true,
      };
    },
  },
  selectors: {
    selectAuthUser: state => state.user,
    selectIsAuthenticated: state => !!state.user,
    selectToken: state => state.token,
    selectIsBooted: state => state.booted,
  },
});

export const { setToken, clearAuth, setAuthUser, booted } = authSlice.actions;
export const { selectAuthUser, selectIsAuthenticated, selectToken, selectIsBooted } = authSlice.selectors;

export const decodeAndStoreToken = createAsyncThunk<void, string>(
  'auth/decodeAndStoreToken',
  async (token, { dispatch }) => {
    const decoded = jwtDecode<User & JwtPayload>(token);

    const { firstName, lastName, email, id } = decoded;
    const user: User = { firstName, lastName, email, id };

    dispatch(setToken(token));
    dispatch(setAuthUser(user));

    localStorage.setItem('JwtToken', token);
  },
);

export const signIn = createAsyncThunk<void, SingInFormData>(
  'auth/signIn',
  async (formData, { dispatch }) => {
    const token = await singInApi(formData);

    if (token) {
      dispatch(decodeAndStoreToken(token));
    }
  },
);

export const login = createAsyncThunk<void, LogInFormData>(
  'auth/login',
  async (formData: LogInFormData, { dispatch }) => {
    const token = await loginApi(formData.email, formData.password);

    if (token) {
      dispatch(decodeAndStoreToken(token));
    }
  },
);

export const loadTokenFromStorage = createAsyncThunk(
  'auth/loadTokenFromStorage',
  async (_arg, { dispatch }) => {
    const token = localStorage.getItem('JwtToken');

    if (token) {
      await dispatch(decodeAndStoreToken(token));
    }
  },
);

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_arg, { dispatch }) => {
    if (!await verifyTokenApi()) {
      dispatch(logout());
    }
  },
);

export const bootApplication = createAsyncThunk(
  'auth/boot',
  async (_arg, { dispatch }) => {
    await dispatch(loadTokenFromStorage())
    await dispatch(verifyToken())
    dispatch(booted())
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_arg, { dispatch }) => {
    localStorage.removeItem('JwtToken');
    dispatch(clearAuth());
  },
);

export default authSlice.reducer;
