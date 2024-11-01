import { types } from '../types';

export interface AuthState {
  loggedIn: boolean;
  name?: string;
}

interface AuthAction {
  type: typeof types.login;
  payload: string;
}

const initialState = {
  loggedIn: false,
  name: undefined,
};

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        loggedIn: true,
        name: action.payload,
      };
    case types.logout:
      return {
        ...state,
        loggedIn: false,
        name: undefined,
      };
    default:
      return state;
  }
};
