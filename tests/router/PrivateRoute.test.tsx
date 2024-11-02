import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { AuthContext } from '../../src/auth/context';
import { PrivateRoute } from '../../src/router/';

// prettier-ignore
describe('Testing PrivateRoute', () => {
  const loginFunctionMocks = {
    login: jest.fn(),
    logout: jest.fn(),
  };

  test('should navigate if user is not logged in', () => {
    const contextValue = {
      authState: {
        loggedIn: false,
      },
      ...loginFunctionMocks,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <Routes>
            <Route
              path="marvel"
              element={
                <PrivateRoute>
                  <h1>Marvel Page</h1>
                </PrivateRoute>
              }
            />

            <Route
              path="login"
              element={
                  <h1>Public route</h1>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Public route')).toBeTruthy();
  });

  test('should render the children if user is logged in', () => {
    Storage.prototype.setItem = jest.fn();


    const contextValue = {
      authState: {
        loggedIn: true,
        user: {
          id: '1',
          name: 'John Doe',
        },
      },
      ...loginFunctionMocks,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
         <PrivateRoute>
          <h1>Marvel Page</h1>
         </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel Page')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
  });
});
