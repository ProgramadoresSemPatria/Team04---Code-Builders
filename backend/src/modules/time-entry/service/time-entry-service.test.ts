import { describe, beforeEach, test, vi, expect } from 'vitest';
import {
  CreateTimeEntryParams,
  TimeEntryService,
  UpdateTimeEntryParams,
} from './time-entry-service';
import {
  NotFound,
  UnprocessableEntity,
} from '../../../common/errors/http-errors';

const mockTimeEntryRepository = {
  create: vi.fn(),
  update: vi.fn(),
  getById: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    projectId: 1,
    duration: 60,
    description: 'any_description',
    date: new Date('2025-03-29'),
  }),
  delete: vi.fn(),
  getUserTimeEntries: vi.fn().mockResolvedValue([
    {
      duration: 60,
      description: 'any_description',
      date: new Date('2025-03-29'),
      project: { name: 'any_project' },
    },
  ]),
};

const mockProjectRepository = {
  getById: vi.fn().mockResolvedValue({
    id: 1,
    name: 'any_project',
    clientId: 1,
    userId: 1,
    status: 'IN_PROGRESS',
    price: 100,
  }),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  getUserProjects: vi.fn(),
};

const mockCreateTimeEntryParams = (): CreateTimeEntryParams => ({
  userId: 1,
  projectId: 1,
  duration: 60,
  description: 'any_description',
  date: new Date('2025-03-29'),
});

const mockUpdateTimeEntryParams = (): UpdateTimeEntryParams => ({
  id: 1,
  userId: 1,
  duration: 60,
  description: 'any_description',
  date: new Date('2025-03-29'),
});

describe('TimeEntryService', () => {
  let sut: TimeEntryService;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new TimeEntryService(mockTimeEntryRepository, mockProjectRepository);
  });

  describe('create()', () => {
    test('Should call projectRepository.getById with correct value', async () => {
      const getByIdSpy = vi.spyOn(mockProjectRepository, 'getById');

      const createTimeEntryParams = mockCreateTimeEntryParams();

      await sut.create(createTimeEntryParams);

      expect(getByIdSpy).toHaveBeenCalledWith(
        createTimeEntryParams.projectId,
        createTimeEntryParams.userId
      );
    });

    test('Should throw UnprocessableEntity if project does not exist', async () => {
      vi.spyOn(mockProjectRepository, 'getById').mockResolvedValueOnce(null);

      await expect(sut.create(mockCreateTimeEntryParams())).rejects.toThrow(
        UnprocessableEntity
      );
    });

    test('Should call timeEntryRepository.create with correct params', async () => {
      const createSpy = vi.spyOn(mockTimeEntryRepository, 'create');
      const createTimeEntryParams = mockCreateTimeEntryParams();

      await sut.create(createTimeEntryParams);

      expect(createSpy).toHaveBeenCalledWith(createTimeEntryParams);
    });

    test('Should throw if projectRepository.getById throws', async () => {
      vi.spyOn(mockProjectRepository, 'getById').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.create(mockCreateTimeEntryParams())).rejects.toThrow();
    });

    test('Should throw if timeEntryRepository.create throws', async () => {
      vi.spyOn(mockTimeEntryRepository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.create(mockCreateTimeEntryParams())).rejects.toThrow();
    });
  });

  describe('update()', () => {
    test('Should call timeEntryRepository.getById with correct value', async () => {
      const getByIdSpy = vi.spyOn(mockTimeEntryRepository, 'getById');
      const updateTimeEntryParams = mockUpdateTimeEntryParams();

      await sut.update(updateTimeEntryParams);

      const { id, userId } = updateTimeEntryParams;
      expect(getByIdSpy).toHaveBeenCalledWith(id, userId);
    });

    test('Should throw NotFound if timeEntry does not exist', async () => {
      vi.spyOn(mockTimeEntryRepository, 'getById').mockResolvedValueOnce(null);

      expect(sut.update(mockUpdateTimeEntryParams())).rejects.toThrow(NotFound);
    });

    test('Should call timeEntryRepository.update with correct params', async () => {
      const updateSpy = vi.spyOn(mockTimeEntryRepository, 'update');
      const updateTimeEntryParams = mockUpdateTimeEntryParams();

      await sut.update(updateTimeEntryParams);

      expect(updateSpy).toHaveBeenCalledWith(updateTimeEntryParams);
    });

    test('Should throw if timeEntryRepository.getById throws', async () => {
      vi.spyOn(mockTimeEntryRepository, 'getById').mockImplementationOnce(
        () => {
          throw new Error();
        }
      );

      expect(sut.update(mockUpdateTimeEntryParams())).rejects.toThrow();
    });

    test('Should throw if timeEntryRepository.update throws', async () => {
      vi.spyOn(mockTimeEntryRepository, 'update').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.update(mockUpdateTimeEntryParams())).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    test('Should call timeEntryRepository.getById with correct value', async () => {
      const getByIdSpy = vi.spyOn(mockTimeEntryRepository, 'getById');
      const id = 1;
      const userId = 2;

      await sut.delete(id, userId);

      expect(getByIdSpy).toHaveBeenCalledWith(id, userId);
    });

    test('Should throw NotFound if timeEntry does not exist', async () => {
      vi.spyOn(mockTimeEntryRepository, 'getById').mockResolvedValueOnce(null);

      expect(sut.delete(1, 2)).rejects.toThrow(NotFound);
    });

    test('Should call timeEntryRepository.delete with correct values', async () => {
      const deleteSpy = vi.spyOn(mockTimeEntryRepository, 'delete');
      const id = 1;
      const userId = 2;

      await sut.delete(id, userId);

      expect(deleteSpy).toHaveBeenCalledWith(id, userId);
    });

    test('Should throw if timeEntryRepository.getById throws', async () => {
      vi.spyOn(mockTimeEntryRepository, 'getById').mockImplementationOnce(
        () => {
          throw new Error();
        }
      );

      expect(sut.delete(1, 2)).rejects.toThrow();
    });

    test('Should throw if timeEntryRepository.delete throws', async () => {
      vi.spyOn(mockTimeEntryRepository, 'delete').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.delete(1, 2)).rejects.toThrow();
    });
  });

  describe('getUserTimeEntries()', () => {
    test('Should call timeEntryRepository.getUserTimeEntries with correct value', async () => {
      const getUserTimeEntriesSpy = vi.spyOn(
        mockTimeEntryRepository,
        'getUserTimeEntries'
      );
      const userId = 1;

      await sut.getUserTimeEntries(userId);

      expect(getUserTimeEntriesSpy).toHaveBeenCalledWith(userId);
    });

    test('Should throw if timeEntryRepository.getUserTimeEntries throws', async () => {
      vi.spyOn(
        mockTimeEntryRepository,
        'getUserTimeEntries'
      ).mockImplementationOnce(() => {
        throw new Error();
      });
      const userId = 1;
      expect(sut.getUserTimeEntries(userId)).rejects.toThrow();
    });

    test('Should return correct value', async () => {
      const userId = 1;
      const result = await sut.getUserTimeEntries(userId);

      expect(result).toEqual([
        {
          duration: 60,
          description: 'any_description',
          date: new Date('2025-03-29'),
          project: { name: 'any_project' },
        },
      ]);
    });
  });
});
