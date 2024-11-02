import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Navbar } from '../../../src/ui/components';
import { AuthContext } from '../../../src/auth/context';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Testing Navbar', () => {
  const contexValue = {
    authState: {
      loggedIn: true,
      user: {
        id: 'ABC',
        name: 'John Doe',
      },
    },
    logout: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test('should show the name of the logged user', () => {
    render(
      <MemoryRouter initialEntries={['/dc']}>
        <AuthContext.Provider value={contexValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeTruthy();
  });

  test('should call logout and navigate when user click on the button', () => {
    render(
      <MemoryRouter initialEntries={['/dc']}>
        <AuthContext.Provider value={contexValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click(logoutButton);

    expect(contexValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {
      replace: true,
    });
  });
});
