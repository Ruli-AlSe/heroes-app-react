import { useContext } from 'react';
import { AuthContext } from '../auth/context';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const {
    authState: { loggedIn },
  } = useContext(AuthContext);

  const { pathname, search } = useLocation();

  const lastPath = pathname + search;
  localStorage.setItem('lastPath', lastPath);

  return loggedIn ? children : <Navigate to="/login" />;
};
