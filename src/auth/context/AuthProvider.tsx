import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

const initialState = {
  loggedIn: false,
  name: undefined,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState] = useReducer(authReducer, initialState);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};
