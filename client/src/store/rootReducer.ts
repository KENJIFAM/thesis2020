import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import requestsReducer from './requestsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  requests: requestsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
