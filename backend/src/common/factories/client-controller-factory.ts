import { ClientController } from '../../modules/client/controller/client-controller';
import { ClientRepository } from '../../modules/client/repository/client-repository';
import { ClientService } from '../../modules/client/service/client-service';

export const makeClientController = () => {
  const clientService = new ClientService(new ClientRepository());

  return new ClientController(clientService);
};
