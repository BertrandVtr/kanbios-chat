import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User.ts';
import { login as loginApi } from '../api/AuthApi.ts';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
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
    clearAuth: () => {
      return {
        ...initialState,
      };
    },
  },
  selectors: {
    selectAuthUser: state => state.user,
    selectIsAuthenticated: state => !!state.user,
  },
});

export const { setToken, clearAuth, setAuthUser } = authSlice.actions;
export const { selectAuthUser, selectIsAuthenticated } = authSlice.selectors;

interface DecodeAndStoreActionPayload {
  token: string;
  onSuccess?: () => void;
}

export const decodeAndStoreToken = createAsyncThunk<void, DecodeAndStoreActionPayload>(
  'auth/decodeAndStoreToken',
  async ({ onSuccess, token }, { dispatch }) => {
    const decoded = jwtDecode<User & JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);

    console.log('bon bon bon', decoded.exp, now);
    if (decoded.exp && now > decoded.exp) {
      localStorage.removeItem('JwtToken');
      dispatch(clearAuth());
      return;
    }

    const { firstName, lastName, email } = decoded;
    const user = { firstName, lastName, email };

    dispatch(setToken(token));
    dispatch(setAuthUser(user));

    localStorage.setItem('JwtToken', token);

    if (onSuccess) {
      onSuccess();
    }
  },
);

interface LoginActionPayload {
  formData: {
    email: string;
    password: string;
  };

  onSuccess?: () => void;
}

export const login = createAsyncThunk<void, LoginActionPayload>(
  'auth/login',
  async ({ onSuccess, formData }, { dispatch }) => {
    const token = await loginApi(formData.email, formData.password);

    if (token) {
      dispatch(decodeAndStoreToken({ token, onSuccess }));
    }
  },
);

export const loadTokenFromStorage = createAsyncThunk(
  'auth/loadTokenFromStorage',
  async (_arg, { dispatch }) => {
    const token = localStorage.getItem('JwtToken');

    if (token) {
      dispatch(decodeAndStoreToken({ token }));
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_arg, { dispatch }) => {
    console.log('bon bon bon');
    localStorage.removeItem('JwtToken');
    dispatch(clearAuth());
  },
);

export default authSlice.reducer;
