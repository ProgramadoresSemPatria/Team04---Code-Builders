import prisma from '../../../prisma/db';
import {
  CreateTimeEntryParams,
  UpdateTimeEntryParams,
} from '../service/time-entry-service';

export class TimeEntryRepository {
  async getUserTimeEntries(userId: number) {
    return await prisma.timeEntry.findMany({
      where: { userId },
      select: {
        duration: true,
        description: true,
        date: true,
        project: { select: { name: true } },
      },
    });
  }

  async getById(id: number, userId: number) {
    const timeEntry = await prisma.timeEntry.findUnique({
      where: { id, userId },
    });
    return timeEntry;
  }
  async create(data: CreateTimeEntryParams) {
    const timeEntry = await prisma.timeEntry.create({ data });
    return timeEntry;
  }
  async update(data: UpdateTimeEntryParams) {
    const { id, userId, ...timeEntryData } = data;
    const timeEntry = await prisma.timeEntry.update({
      where: { id, userId },
      data: timeEntryData,
    });
    return timeEntry;
  }
  async delete(id: number, userId: number) {
    await prisma.timeEntry.delete({ where: { id, userId } });
  }
}
