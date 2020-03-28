import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducerRoot, { RootState } from './reducers';

const store = configureStore({
  reducer: reducerRoot,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(reducerRoot));
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
