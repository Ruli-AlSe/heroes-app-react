import { useContext } from 'react';
import { AuthContext } from '../auth/context';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const {
    authState: { loggedIn },
  } = useContext(AuthContext);

  return loggedIn ? <Navigate to="/marvel" /> : children;
};
