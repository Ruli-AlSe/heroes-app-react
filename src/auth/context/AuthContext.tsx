import { createContext } from 'react';
import { AuthState } from './authReducer';

export const AuthContext = createContext({} as AuthState);
