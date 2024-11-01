import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onLogin = () => {
    login('123', 'Raul Almanza');

    navigate('/', {
      replace: true,
    });
  };

  return (
    <div className="container mt-5">
      <h1>Login Page</h1>
      <hr />

      <button className="btn btn-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};
