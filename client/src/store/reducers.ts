import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice';

export interface RootState {
  auth: AuthState;
}

export default combineReducers<RootState>({
  auth: authReducer,
});
