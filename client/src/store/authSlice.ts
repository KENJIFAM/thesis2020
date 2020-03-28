import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import atob from 'atob';
import axios, { setTokenHeader } from '../apis';
import type { AxiosResponse } from 'axios';
import type {
  User,
  LogInFormData,
  AuthResponse,
  TokenPayload,
  SignUpFormData,
} from '../services/types';
import type { AppThunk } from '.';

export interface RootState {
  auth: AuthState;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state): AuthState => ({
      ...state,
      isLoading: true,
    }),
    authSuccess: (state, action: PayloadAction<User>): AuthState => ({
      ...state,
      isLoading: false,
      error: null,
      user: action.payload,
    }),
    authFail: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    logOut: (state): AuthState => ({
      ...state,
      user: null,
    }),
  },
});

export const { authStart, authSuccess, authFail, logOut: logOutAction } = authSlice.actions;

export const saveToken = (token: string): void => localStorage.setItem('token', token);

export const getToken = (): string | null => localStorage.getItem('token');

export const isLoggedIn = (): boolean => {
  const payload = getToken()?.split('.')[1];
  if (!payload) {
    return false;
  }
  const decode: TokenPayload = JSON.parse(atob(payload));
  const now = Date.now() / 1000;
  return !!decode.id && parseInt(decode.iat) < now && parseInt(decode.exp) > now;
};

export const logOut = (): AppThunk => async (dispatch) => {
  localStorage.removeItem('token');
  setTokenHeader();
  dispatch(logOutAction());
};

export const auth = (
  type: 'login' | 'signup',
  authFormData: LogInFormData | SignUpFormData,
): AppThunk => async (dispatch) => {
  try {
    dispatch(authStart());
    const auth: AxiosResponse<AuthResponse> = await axios.post(`/auth/${type}`, authFormData);
    const { token } = auth.data;
    setTokenHeader(token);
    const user: AxiosResponse<User> = await axios.get('/profile');
    saveToken(token);
    dispatch(authSuccess(user.data));
  } catch (e) {
    dispatch(authFail(e.response.data.error));
  }
};

export default authSlice.reducer;
