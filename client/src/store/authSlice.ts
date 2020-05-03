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

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state): AuthState => ({ ...state, isLoading: true, error: null }),
    authSuccess: (state, action: PayloadAction<User>): AuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      error: null,
      user: action.payload,
    }),
    authFail: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    authReset: (): AuthState => initialState,
  },
});

export const { authStart, authSuccess, authFail, authReset } = authSlice.actions;

export const saveToken = (token: string): void => localStorage.setItem('token', token);

export const getToken = (): string | null => localStorage.getItem('token');

export const getTokenPayload = (): TokenPayload | null => {
  const payload = getToken()?.split('.')[1];
  return payload ? JSON.parse(atob(payload)) : null;
};

export const validToken = (): boolean => {
  const payload = getTokenPayload();
  const now = Date.now() / 1000;
  return !!payload?.id && parseInt(payload.iat) < now && parseInt(payload.exp) > now;
};

export const logOut = (): AppThunk => async (dispatch) => {
  localStorage.removeItem('token');
  setTokenHeader();
  dispatch(authReset());
};

export const auth = (
  type: 'login' | 'signup',
  authFormData: LogInFormData | SignUpFormData,
): AppThunk => async (dispatch) => {
  try {
    dispatch(authStart());
    const auth: AxiosResponse<AuthResponse> = await axios.post(`/auth/${type}`, authFormData);
    const { token, user } = auth.data;
    setTokenHeader(token);
    saveToken(token);
    dispatch(authSuccess(user));
  } catch (e) {
    dispatch(authFail(e.response.data.error));
  }
};

export const initialAuth = (): AppThunk => async (dispatch, getState) => {
  try {
    if (getState().auth.isLoggedIn) return;
    const token = getToken();
    const payload = getTokenPayload();
    if (!token || !payload) return;
    setTokenHeader(token);
    const user: AxiosResponse<User> = await axios.get('/profile');
    dispatch(authSuccess(user.data));
  } catch (e) {
    dispatch(authReset());
  }
};

export default authSlice.reducer;
