import { Router } from 'express';
import { makeClientController } from '../../../common/factories/client-controller-factory';
import { validate } from '../../../common/middlewares/validation-middleware';
import { clientSchema } from '../validations/schemas';

const clientController = makeClientController();

export default (router: Router): void => {
  router.get('/clients/:id', (req, res, next) =>
    clientController.getById(req, res, next)
  );
  router.get('/clients', (req, res, next) =>
    clientController.getUserClients(req, res, next)
  );
  router.post('/clients', validate(clientSchema), (req, res, next) =>
    clientController.create(req, res, next)
  );
  router.patch('/clients/:id', validate(clientSchema), (req, res, next) =>
    clientController.update(req, res, next)
  );
  router.delete('/clients/:id', (req, res, next) =>
    clientController.delete(req, res, next)
  );
};
