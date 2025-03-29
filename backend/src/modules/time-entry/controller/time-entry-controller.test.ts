// #Esse arquivo foi criado com o auxílio de IA
import { describe, beforeEach, test, vi, expect } from 'vitest';
import { TimeEntryController } from './time-entry-controller';
import { NextFunction, Request, Response } from 'express';
import { TimeEntryService } from '../service/time-entry-service';

const mockTimeEntryService = {
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  getUserTimeEntries: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      projectId: 1,
      description: 'any_description',
      startTime: new Date(),
      endTime: new Date(),
      duration: 3600,
    },
  ]),
} as unknown as TimeEntryService;

describe('TimeEntryController', () => {
  let sut: TimeEntryController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new TimeEntryController(mockTimeEntryService);

    mockRequest = {
      userId: 1,
      body: {
        projectId: 1,
        description: 'any_description',
        startTime: new Date(),
        endTime: new Date(),
      },
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    mockNext = vi.fn();
  });

  describe('getUserTimeEntries()', () => {
    test('Should call timeEntryService.getUserTimeEntries with correct value', async () => {
      const getUserTimeEntriesSpy = vi.spyOn(
        mockTimeEntryService,
        'getUserTimeEntries'
      );

      await sut.getUserTimeEntries(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId } = mockRequest;

      expect(getUserTimeEntriesSpy).toHaveBeenCalledWith(userId);
    });

    test('Should return 200 status with time entries data on success', async () => {
      await sut.getUserTimeEntries(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([
        {
          id: 1,
          userId: 1,
          projectId: 1,
          description: 'any_description',
          startTime: expect.any(Date),
          endTime: expect.any(Date),
          duration: 3600,
        },
      ]);
    });

    test('Should call next with error if timeEntryService.getUserTimeEntries throws', async () => {
      const error = new Error();
      vi.spyOn(
        mockTimeEntryService,
        'getUserTimeEntries'
      ).mockImplementationOnce(() => {
        throw error;
      });

      await sut.getUserTimeEntries(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('create()', () => {
    test('Should call timeEntryService.create with correct values', async () => {
      const createSpy = vi.spyOn(mockTimeEntryService, 'create');

      await sut.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId, body } = mockRequest;

      expect(createSpy).toHaveBeenCalledWith({ userId, ...body });
    });

    test('Should return 201 status with success message on success', async () => {
      await sut.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Temporizador criado com sucesso!',
      });
    });

    test('Should call next with error if timeEntryService.create throws', async () => {
      const error = new Error();
      vi.spyOn(mockTimeEntryService, 'create').mockImplementationOnce(() => {
        throw error;
      });

      await sut.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('update()', () => {
    beforeEach(() => {
      mockRequest = {
        params: { id: '1' },
        userId: 1,
        body: {
          projectId: 1,
          description: 'updated_description',
          startTime: new Date(),
          endTime: new Date(),
        },
      };
    });

    test('Should call timeEntryService.update with correct values', async () => {
      const updateSpy = vi.spyOn(mockTimeEntryService, 'update');

      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId, body, params } = mockRequest;

      expect(updateSpy).toHaveBeenCalledWith({
        id: Number(params!.id),
        userId,
        ...body,
      });
    });

    test('Should return 201 status with success message on success', async () => {
      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Temporizador atualizado com sucesso!',
      });
    });

    test('Should call next with error if timeEntryService.update throws', async () => {
      const error = new Error();
      vi.spyOn(mockTimeEntryService, 'update').mockImplementationOnce(() => {
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

  describe('delete()', () => {
    beforeEach(() => {
      mockRequest = {
        params: { id: '1' },
        userId: 1,
      };
    });

    test('Should call timeEntryService.delete with correct values', async () => {
      const deleteSpy = vi.spyOn(mockTimeEntryService, 'delete');

      await sut.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId, params } = mockRequest;

      expect(deleteSpy).toHaveBeenCalledWith(Number(params!.id), userId);
    });

    test('Should return 200 status with success message on success', async () => {
      await sut.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Temporizador excluído com sucesso!',
      });
    });

    test('Should call next with error if timeEntryService.delete throws', async () => {
      const error = new Error();
      vi.spyOn(mockTimeEntryService, 'delete').mockImplementationOnce(() => {
        throw error;
      });

      await sut.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
