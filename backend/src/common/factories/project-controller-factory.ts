import { ClientRepository } from '../../modules/client/repository/client-repository';
import { ProjectController } from '../../modules/project/controller/project-controller';
import { ProjectRepository } from '../../modules/project/repository/project-repository';
import { ProjectService } from '../../modules/project/service/project-service';

export const makeProjectController = () => {
  const projectService = new ProjectService(
    new ProjectRepository(),
    new ClientRepository()
  );

  return new ProjectController(projectService);
};
