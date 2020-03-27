import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { User, LogInFormData, AuthResponse } from '../services/types';
import { AppThunk } from '.';
import axios, { setTokenHeader } from '../apis';

export interface RootState {
  auth: AuthState;
}

interface AuthState {
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

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInStart: (state): AuthState => ({
      ...state,
      isLoading: true,
    }),
    logInSuccess: (state, action: PayloadAction<User>): AuthState => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      error: null,
      user: action.payload,
    }),
    logInFail: (state, action: PayloadAction<string>): AuthState => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
    logOut: (state): AuthState => ({
      ...state,
      isLoggedIn: false,
      user: null,
    }),
  },
});

export const { logInStart, logInSuccess, logInFail, logOut } = auth.actions;

export const logIn = ({ email, password }: LogInFormData): AppThunk => async (dispatch) => {
  try {
    dispatch(logInStart());
    const auth: AxiosResponse<AuthResponse> = await axios.post('/auth/login', {
      email,
      password,
    });
    const { token } = auth.data;
    setTokenHeader(token);
    const user: AxiosResponse<User> = await axios.get('/profile');
    localStorage.setItem('token', token);
    dispatch(logInSuccess(user.data));
  } catch (err) {
    dispatch(logInFail(err.response.data.error));
  }
};

export default auth.reducer;
