import { combineReducers } from 'redux';
import { AuthAction, ActionTypes } from '../services/types';

export interface AppState {
  auth: AuthState;
}

export interface AuthState {
  user: string | null;
}

const INITIAL_STATE: AuthState = {
  user: null,
};

const auth = (state: AuthState = INITIAL_STATE, action: AuthAction): AuthState => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return { ...state, user: action.user };
    case ActionTypes.SIGN_OUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default combineReducers<AppState>({
  auth,
});
