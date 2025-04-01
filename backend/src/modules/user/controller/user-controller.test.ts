import { describe, beforeEach, test, vi, expect } from 'vitest';
import { UserController } from './user-controller';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user-service';
import { Hasher } from '../../auth/protocols/hasher';

const mockUserService = {
  update: vi.fn(),
  getById: vi
    .fn()
    .mockResolvedValueOnce({ name: 'any_name', email: 'any_email' }),
} as unknown as UserService;

const mockHasher = {
  hash: vi.fn().mockResolvedValue('hashed_password'),
} as unknown as Hasher;

describe('UserController', () => {
  let sut: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new UserController(mockUserService, mockHasher);

    mockRequest = {
      userId: 1,
      params: { id: '1' },
      body: { name: 'any_name', email: 'any_email@example.com' },
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    mockNext = vi.fn();
  });

  describe('update()', () => {
    test('Should call userService.update with correct values when password is not provided', async () => {
      const updateSpy = vi.spyOn(mockUserService, 'update');

      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { body, params } = mockRequest;

      expect(updateSpy).toHaveBeenCalledWith({
        id: Number(params!.id),
        ...body,
      });
      expect(mockHasher.hash).not.toHaveBeenCalled();
    });

    test('Should call hasher.hash with correct password when password is provided', async () => {
      const password = 'any_password';
      mockRequest.body = { ...mockRequest.body, password };

      const hashSpy = vi.spyOn(mockHasher, 'hash');

      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(hashSpy).toHaveBeenCalledWith(password);
    });

    test('Should call userService.update with hashed password when password is provided', async () => {
      const password = 'any_password';
      mockRequest.body = { ...mockRequest.body, password };

      const updateSpy = vi.spyOn(mockUserService, 'update');

      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { body, params } = mockRequest;

      expect(updateSpy).toHaveBeenCalledWith({
        id: Number(params!.id),
        ...body,
        password: 'hashed_password',
      });
    });

    test('Should return 200 status with success message on success', async () => {
      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Usuário atualizado com sucesso!',
      });
    });

    test('Should call next with error if userService.update throws', async () => {
      const error = new Error();
      vi.spyOn(mockUserService, 'update').mockImplementationOnce(() => {
        throw error;
      });

      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });

    test('Should call next with error if hasher.hash throws', async () => {
      mockRequest.body = { ...mockRequest.body, password: 'any_password' };

      const error = new Error();
      vi.spyOn(mockHasher, 'hash').mockImplementationOnce(() => {
        throw error;
      });

      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  describe('getById()', () => {
    test('Should call userService.getById with correct value', async () => {
      const getByIdSpy = vi.spyOn(mockUserService, 'getById');

      await sut.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId } = mockRequest;

      expect(getByIdSpy).toHaveBeenCalledWith(userId);
    });
  });
});
