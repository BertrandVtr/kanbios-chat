import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User.ts';

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
  reducers: {},
  selectors: {},
});

export const login = createAsyncThunk(
  'auth/login',
  async () => {

  }
)

export default authSlice.reducer;
