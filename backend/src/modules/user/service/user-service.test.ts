// #esse arquivo foi gerado com auxílio de IA

import { describe, beforeEach, test, vi, expect } from 'vitest';
import { UserService, UpdateUserParams } from './user-service';
import {
  NotFound,
  UnprocessableEntity,
} from '../../../common/errors/http-errors';

const mockUserRepository = {
  getById: vi.fn().mockResolvedValue({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    serviceType: 'Consultoria',
    password: 'hashed_password',
    phone: '(11) 98765-4321',
    address: 'Rua Exemplo, 123',
    city: 'São Paulo',
    neighborhood: 'Centro',
    postalCode: '01234-567',
    isEmailVerified: true,
    isPaymentDone: false,
    projects: [],
    clients: [],
    timeEntries: [],
    updatedAt: new Date(),
    createdAt: new Date(),
  }),
  getByEmail: vi.fn().mockResolvedValue(null),
  update: vi.fn(),
  create: vi.fn(),
};

const mockUpdateUserParams = (): UpdateUserParams => ({
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  serviceType: 'Consultoria',
  password: 'new_password',
  phone: '(11) 98765-4321',
  address: 'Rua Exemplo, 123',
  city: 'São Paulo',
  neighborhood: 'Centro',
  postalCode: '01234-567',
  isPaymentDone: false,
});

describe('UserService', () => {
  let sut: UserService;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new UserService(mockUserRepository);
  });

  describe('update()', () => {
    test('Should call userRepository.getById with correct value', async () => {
      const getByIdSpy = vi.spyOn(mockUserRepository, 'getById');
      const updateUserParams = mockUpdateUserParams();

      await sut.update(updateUserParams);

      expect(getByIdSpy).toHaveBeenCalledWith(updateUserParams.id);
    });

    test('Should throw NotFound if user does not exist', async () => {
      vi.spyOn(mockUserRepository, 'getById').mockResolvedValueOnce(null);
      const updateUserParams = mockUpdateUserParams();

      await expect(sut.update(updateUserParams)).rejects.toThrow(
        new NotFound('Usuário não encontrado')
      );
    });

    test('Should call userRepository.getByEmail with correct value if email is provided', async () => {
      const getByEmailSpy = vi.spyOn(mockUserRepository, 'getByEmail');
      const updateUserParams = mockUpdateUserParams();

      await sut.update(updateUserParams);

      expect(getByEmailSpy).toHaveBeenCalledWith(updateUserParams.email);
    });

    test('Should not call userRepository.getByEmail if email is not provided', async () => {
      const getByEmailSpy = vi.spyOn(mockUserRepository, 'getByEmail');
      const updateUserParams = { ...mockUpdateUserParams(), email: undefined };

      await sut.update(updateUserParams);

      expect(getByEmailSpy).not.toHaveBeenCalled();
    });

    test('Should throw UnprocessableEntity if email already exists for another user', async () => {
      vi.spyOn(mockUserRepository, 'getByEmail').mockResolvedValueOnce({
        id: 2,
        email: 'john.doe@example.com',
        name: 'Another User',
        serviceType: 'Design',
        password: 'hashed_password',
        isEmailVerified: true,
        isPaymentDone: true,
        projects: [],
        clients: [],
        timeEntries: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      const updateUserParams = mockUpdateUserParams();

      await expect(sut.update(updateUserParams)).rejects.toThrow(
        new UnprocessableEntity('Já existe um usuário com esse e-mail')
      );
    });

    test('Should not throw if email exists but belongs to the same user', async () => {
      vi.spyOn(mockUserRepository, 'getByEmail').mockResolvedValueOnce({
        id: 1,
        email: 'john.doe@example.com',
        name: 'John Doe',
        serviceType: 'Consultoria',
        password: 'hashed_password',
        isEmailVerified: true,
        isPaymentDone: false,
        projects: [],
        clients: [],
        timeEntries: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      const updateUserParams = mockUpdateUserParams();

      await expect(sut.update(updateUserParams)).resolves.not.toThrow();
    });

    test('Should call userRepository.update with correct params', async () => {
      const updateSpy = vi.spyOn(mockUserRepository, 'update');
      const updateUserParams = mockUpdateUserParams();

      await sut.update(updateUserParams);

      expect(updateSpy).toHaveBeenCalledWith(updateUserParams);
    });

    test('Should throw if userRepository.getById throws', async () => {
      vi.spyOn(mockUserRepository, 'getById').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.update(mockUpdateUserParams())).rejects.toThrow();
    });

    test('Should throw if userRepository.getByEmail throws', async () => {
      vi.spyOn(mockUserRepository, 'getByEmail').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.update(mockUpdateUserParams())).rejects.toThrow();
    });

    test('Should throw if userRepository.update throws', async () => {
      vi.spyOn(mockUserRepository, 'update').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.update(mockUpdateUserParams())).rejects.toThrow();
    });
  });
});
