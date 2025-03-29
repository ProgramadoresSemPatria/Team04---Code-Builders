import { test, describe, beforeEach, vi, expect } from 'vitest';
import prisma from '../../../prisma/db';
import {
  CreateTimeEntryParams,
  UpdateTimeEntryParams,
} from '../service/time-entry-service';
import { TimeEntryRepository } from './time-entry-repository';

vi.mock('../../../prisma/db', () => ({
  default: {
    timeEntry: {
      create: vi.fn().mockResolvedValue({
        id: 1,
        userId: 1,
        projectId: 1,
        duration: 60,
        description: 'any_description',
        date: new Date('2025-03-29'),
      }),
      update: vi.fn().mockResolvedValue({
        id: 1,
        userId: 1,
        projectId: 1,
        duration: 60,
        description: 'any_description',
        date: new Date('2025-03-29'),
      }),
      delete: vi.fn(),
      findMany: vi.fn().mockResolvedValue([
        {
          duration: 60,
          description: 'any_description',
          date: new Date('2025-03-29'),
          project: { name: 'any_project' },
        },
        {
          duration: 30,
          description: 'another_description',
          date: new Date('2025-03-28'),
          project: { name: 'another_project' },
        },
      ]),
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        userId: 1,
        projectId: 1,
        duration: 60,
        description: 'any_description',
        date: new Date('2025-03-29'),
      }),
    },
  },
}));

const mockTimeEntryModel = () => ({
  id: 1,
  userId: 1,
  projectId: 1,
  duration: 60,
  description: 'any_description',
  date: new Date('2025-03-29'),
});

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

const mockTimeEntries = () => [
  {
    duration: 60,
    description: 'any_description',
    date: new Date('2025-03-29'),
    project: { name: 'any_project' },
  },
  {
    duration: 30,
    description: 'another_description',
    date: new Date('2025-03-28'),
    project: { name: 'another_project' },
  },
];

describe('TimeEntryRepository', () => {
  let sut: TimeEntryRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new TimeEntryRepository();
  });

  describe('create()', () => {
    test('Should call prisma with correct params', async () => {
      const createTimeEntryParams = mockCreateTimeEntryParams();

      await sut.create(createTimeEntryParams);

      expect(prisma.timeEntry.create).toHaveBeenCalledWith({
        data: createTimeEntryParams,
      });
    });

    test('Should return created time entry', async () => {
      const result = await sut.create(mockCreateTimeEntryParams());

      expect(result).toStrictEqual(mockTimeEntryModel());
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.timeEntry.create).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.create(mockCreateTimeEntryParams())).rejects.toThrow();
    });
  });

  describe('update()', () => {
    test('Should call prisma with correct params', async () => {
      const updateTimeEntryParams = mockUpdateTimeEntryParams();

      await sut.update(updateTimeEntryParams);

      const { id, userId, ...timeEntryData } = updateTimeEntryParams;

      expect(prisma.timeEntry.update).toHaveBeenCalledWith({
        where: { id, userId },
        data: timeEntryData,
      });
    });

    test('Should return updated time entry', async () => {
      const result = await sut.update(mockUpdateTimeEntryParams());

      expect(result).toStrictEqual(mockTimeEntryModel());
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.timeEntry.update).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.update(mockUpdateTimeEntryParams())).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    test('Should call prisma with correct values', async () => {
      const id = 1;
      const userId = 2;
      await sut.delete(id, userId);

      expect(prisma.timeEntry.delete).toHaveBeenCalledWith({
        where: { id, userId },
      });
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.timeEntry.delete).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.delete(1, 2)).rejects.toThrow();
    });
  });

  describe('getUserTimeEntries()', () => {
    test('Should call prisma with correct value', async () => {
      const userId = 1;
      await sut.getUserTimeEntries(userId);

      expect(prisma.timeEntry.findMany).toHaveBeenCalledWith({
        where: { userId },
        select: {
          duration: true,
          description: true,
          date: true,
          project: { select: { name: true } },
        },
      });
    });

    test('Should throw if prisma throws', async () => {
      const userId = 1;
      vi.mocked(prisma.timeEntry.findMany).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.getUserTimeEntries(userId)).rejects.toThrow();
    });

    test('Should return correct time entries', async () => {
      const userId = 1;
      const result = await sut.getUserTimeEntries(userId);

      expect(result).toStrictEqual(mockTimeEntries());
    });
  });

  describe('getById()', () => {
    test('Should call prisma with correct values', async () => {
      const id = 1;
      const userId = 2;
      await sut.getById(id, userId);

      expect(prisma.timeEntry.findUnique).toHaveBeenCalledWith({
        where: { id, userId },
      });
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.timeEntry.findUnique).mockImplementationOnce(() => {
        throw new Error();
      });
      const id = 1;
      const userId = 2;
      expect(sut.getById(id, userId)).rejects.toThrow();
    });

    test('Should return correct value', async () => {
      const id = 1;
      const userId = 2;
      const result = await sut.getById(id, userId);

      expect(result).toStrictEqual(mockTimeEntryModel());
    });
  });
});
