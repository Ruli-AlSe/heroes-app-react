import { createContext } from 'react';
import { AuthState } from './authReducer';

export interface AuthContextProps {
  authState: AuthState;
  login: (id: string, name: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);
