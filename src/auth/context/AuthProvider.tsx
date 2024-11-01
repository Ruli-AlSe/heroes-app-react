import { useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { AuthAction, authReducer } from './authReducer';
import { types } from '../types';

const initializer = () => {
  const user = JSON.parse(String(localStorage.getItem('user'))) || undefined;

  return {
    loggedIn: !!user,
    user,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, initializer);

  const login = (id: string, name: string) => {
    const user = { id, name };
    const action: AuthAction = {
      type: types.login,
      payload: user,
    };

    localStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem('user');

    const action: AuthAction = {
      type: types.logout,
      payload: undefined,
    };

    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
