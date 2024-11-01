import { useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { AuthAction, authReducer } from './authReducer';
import { types } from '../types';

const initialState = {
  loggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = (id: string, name: string) => {
    const action: AuthAction = {
      type: types.login,
      payload: {
        id,
        name,
      },
    };

    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
