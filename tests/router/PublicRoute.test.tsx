import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { AuthContext } from '../../src/auth/context';
import { PublicRoute } from '../../src/router/PublicRoute';

// prettier-ignore
describe('Testing PublicRoute', () => {
  const loginFunctionMocks = {
    login: jest.fn(),
    logout: jest.fn(),
  };

  test('should render the children if user is not logged in', () => {
    const contextValue = {
      authState: {
        loggedIn: false,
      },
      ...loginFunctionMocks,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Public route')).toBeTruthy();
  });

  test('should navigate if user is logged in', () => {
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
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="marvel" element={<h1>Marvel Page</h1>} />

            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Public route</h1>
                </PublicRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel Page')).toBeTruthy();
  });
});
