import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types';

describe('Testing authReducer', () => {
  const initialState = { loggedIn: false };
  const user = { id: '1', name: 'user test' };

  test('should return default state value', () => {
    const action = { type: 'test', payload: undefined };

    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  test('should call login, authenticate and set user', () => {
    const action = { type: types.login, payload: user };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      loggedIn: true,
      user,
    });
  });

  test('should call logout, remove user and set loggedIn to false', () => {
    const initialState = { loggedIn: true, user };
    const action = { type: types.logout, payload: undefined };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      loggedIn: false,
      user: undefined,
    });
  });
});
