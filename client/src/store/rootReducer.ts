import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import requestsReducer from './requestsSlice';
import chatsReducer from './chatsSlice';
import messagesReducer from './messagesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  requests: requestsReducer,
  chats: chatsReducer,
  messages: messagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
