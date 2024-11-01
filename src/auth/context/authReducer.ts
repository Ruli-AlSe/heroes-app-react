import { types } from '../types';

interface UserInfo {
  id: string;
  name: string;
}

export interface AuthState {
  loggedIn: boolean;
  user?: UserInfo;
}

export interface AuthAction {
  type: typeof types.login;
  payload: UserInfo | undefined;
}

const initialState = {
  loggedIn: false,
  user: undefined,
};

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    case types.logout:
      return {
        ...state,
        loggedIn: false,
        user: undefined,
      };
    default:
      return state;
  }
};
