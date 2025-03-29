import {
  NotFound,
  UnprocessableEntity,
} from '../../../common/errors/http-errors';
import { ProjectRepository } from '../../project/repository/project-repository';
import { TimeEntryRepository } from '../repository/time-entry-repository';

export type CreateTimeEntryParams = {
  userId: number;
  projectId: number;
  duration: number;
  description: string;
  date: Date;
};
export type UpdateTimeEntryParams = {
  id: number;
  userId: number;
  duration: number;
  description: string;
  date: Date;
};

export class TimeEntryService {
  constructor(
    private readonly timeEntryRepository: TimeEntryRepository,
    private readonly projectRepository: ProjectRepository
  ) {
    this.timeEntryRepository = timeEntryRepository;
    this.projectRepository = projectRepository;
  }

  async getUserTimeEntries(userId: number) {
    const timeEntries = await this.timeEntryRepository.getUserTimeEntries(
      userId
    );
    return timeEntries;
  }

  async create(data: CreateTimeEntryParams) {
    const project = await this.projectRepository.getById(
      data.projectId,
      data.userId
    );
    if (!project) throw new UnprocessableEntity('Projeto não encontrado');

    await this.timeEntryRepository.create(data);
  }

  async update(data: UpdateTimeEntryParams) {
    const timeEntry = await this.timeEntryRepository.getById(
      data.id,
      data.userId
    );
    if (!timeEntry) throw new NotFound('TimeEntry não encontrado');

    await this.timeEntryRepository.update(data);
  }

  async delete(id: number, userId: number) {
    const timeEntry = await this.timeEntryRepository.getById(id, userId);
    if (!timeEntry) throw new NotFound('TimeEntry não encontrado');

    await this.timeEntryRepository.delete(id, userId);
  }
}
