import { ActionTypes, SignOutAction, SignInAction } from '../services/types';

export const signIn = (user: string): SignInAction => ({
  type: ActionTypes.SIGN_IN,
  user,
});

export const signOut = (): SignOutAction => ({
  type: ActionTypes.SIGN_OUT,
});
