import { beforeEach, describe, expect, test, vi } from 'vitest';
import { UserRepository } from '../../user/repository/user-repository';
import { BcryptAdapter } from '../../../common/adapters/bcrypt-adapter';

import { AuthService, SignUpParams } from './auth-service';

const mockUserRepository = {
  getByEmail: vi.fn(),
  create: vi.fn(),
} as unknown as UserRepository;

const mockHasher = {
  hash: vi.fn(),
} as unknown as BcryptAdapter;

const mockSignUpParams = (): SignUpParams => ({
  email: 'any_email',
  password: 'any_password',
  confirmPassword: 'any_password',
  name: 'any_name',
});

describe('AuthService', () => {
  let sut: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new AuthService(mockUserRepository, mockHasher);
  });

  test('ensure AuthService calls UserRepository with correct value', async () => {
    const getByEmailSpy = vi.spyOn(mockUserRepository, 'getByEmail');

    await sut.signUp(mockSignUpParams());

    expect(getByEmailSpy).toHaveBeenCalledWith(mockSignUpParams().email);
  });
});
