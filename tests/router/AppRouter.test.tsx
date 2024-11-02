import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../src/auth/context';
import { AppRouter } from '../../src/router/AppRouter';

describe('Testing AppRouter', () => {
  test('should render login if user is not authenticated', () => {
    const contextValue = {
      authState: {
        loggedIn: false,
        user: undefined,
      },
      login: (id: string, name: string) => {},
      logout: () => {},
    };

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy();
  });

  test('should render Marvel page if user is authenticated', () => {
    const contextValue = {
      authState: {
        loggedIn: true,
        user: {
          id: 'ABC',
          name: 'John Doe',
        },
      },
      login: (id: string, name: string) => {},
      logout: () => {},
    };

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Marvel comics')).toBeTruthy();
    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
  });
});
