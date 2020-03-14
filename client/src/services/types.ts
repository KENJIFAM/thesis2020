/**
 * ACTIONS
 */

export enum ActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export interface SignInAction {
  type: ActionTypes.SIGN_IN;
  user: string;
}

export interface SignOutAction {
  type: ActionTypes.SIGN_OUT;
}

export type AuthAction = SignInAction | SignOutAction;
