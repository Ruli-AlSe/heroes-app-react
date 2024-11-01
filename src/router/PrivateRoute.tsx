import { useContext } from 'react';
import { AuthContext } from '../auth/context';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const {
    authState: { loggedIn },
  } = useContext(AuthContext);

  return loggedIn ? children : <Navigate to="/login" />;
};
