import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducer, { RootState } from './authSlice';

const store = configureStore({
  reducer: reducer,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./authSlice', () => store.replaceReducer(reducer));
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
