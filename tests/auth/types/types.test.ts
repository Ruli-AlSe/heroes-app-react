import { types } from '../../../src/auth/types';

describe('Testing types', () => {
  test('should return correct types', () => {
    expect(types).toEqual({
      login: '[AUTH] Login',
      logout: '[AUTH] Logout',
    });
  });
});
