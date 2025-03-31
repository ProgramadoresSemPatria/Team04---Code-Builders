import { ProjectRepository } from '../../modules/project/repository/project-repository';
import { TimeEntryController } from '../../modules/time-entry/controller/time-entry-controller';
import { TimeEntryRepository } from '../../modules/time-entry/repository/time-entry-repository';
import { TimeEntryService } from '../../modules/time-entry/service/time-entry-service';

export const makeTimeEntryController = () => {
  const projectService = new TimeEntryService(
    new TimeEntryRepository(),
    new ProjectRepository()
  );

  return new TimeEntryController(projectService);
};
