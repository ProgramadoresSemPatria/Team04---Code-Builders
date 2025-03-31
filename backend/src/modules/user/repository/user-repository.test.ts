import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { UserRepository } from './user-repository';
import prisma from '../../../prisma/db';
import { SignUpParams } from '../../auth/service/auth-service';
import Mockdate from 'mockdate';

vi.mock('../../../prisma/db', () => ({
  default: {
    user: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn() },
  },
}));

const mockUser = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  serviceType: 'any_service_type',
  password: 'hashed_password',
  phone: '(11) 98765-4321',
  address: 'any_address',
  city: 'any_city',
  neighborhood: 'any_neighborhood',
  postalCode: '01234-567',
  isEmailVerified: true,
  isPaymentDone: false,
  projects: [],
  clients: [],
  timeEntries: [],
  updatedAt: new Date(),
  createdAt: new Date(),
});

const mockUpdateUserParams = () => ({
  id: 1,
  name: 'updated_name',
  email: 'updated_email@mail.com',
  password: 'updated_password',
  serviceType: 'updated_service_type',
});

const mockSignUpParams = (): SignUpParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
  serviceType: 'any_service_type',
  confirmPassword: 'any_password',
  name: 'any_name',
});

describe('UserRepository', () => {
  let sut: UserRepository;

  beforeAll(() => {
    Mockdate.set(new Date());
  });
  afterAll(() => {
    Mockdate.reset();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new UserRepository();
  });

  describe('getByEmail', () => {
    test('Should call prisma findUnique with correct value', async () => {
      await sut.getByEmail('any_email@mail.com');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'any_email@mail.com' },
      });
    });

    test('Should return user if it is found', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(mockUser());

      const result = await sut.getByEmail('any_email@mail.com');

      expect(result).toStrictEqual(mockUser());
    });

    test('Should return null if user does not exist', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null);
      const result = await sut.getByEmail('any_email@mail.com');

      expect(result).toBeNull();
    });
    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.user.findUnique).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.getByEmail('any_email@mail.com')).rejects.toThrow();
    });
  });

  describe('create', () => {
    test('Should call prisma created method with correct data', async () => {
      await sut.create(mockSignUpParams());

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'any_email@mail.com',
          name: 'any_name',
          password: 'any_password',
          serviceType: 'any_service_type',
        },
      });
    });

    test('Should return user returned by prisma created method', async () => {
      vi.mocked(prisma.user.create).mockResolvedValueOnce(mockUser());

      const result = await sut.create(mockSignUpParams());

      expect(result).toStrictEqual(mockUser());
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.user.create).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.create(mockSignUpParams())).rejects.toThrow();
    });
  });

  describe('update', () => {
    test('Should call prisma update method with correct data', async () => {
      await sut.update(mockUpdateUserParams());

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: 'updated_name',
          email: 'updated_email@mail.com',
          password: 'updated_password',
          serviceType: 'updated_service_type',
        },
      });
    });

    test('Should return user returned by prisma update method', async () => {
      vi.mocked(prisma.user.update).mockResolvedValueOnce(mockUser());

      const result = await sut.update(mockUpdateUserParams());

      expect(result).toStrictEqual(mockUser());
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.user.update).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.update(mockUpdateUserParams())).rejects.toThrow();
    });
  });
});
