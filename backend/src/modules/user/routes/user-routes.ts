import { Router } from 'express';
import { makeUserController } from '../../../common/factories/user-controller-factory';
import { validate } from '../../../common/middlewares/validation-middleware';
import { updateUserSchema } from '../validations/schemas';

const userController = makeUserController();

export default (router: Router): void => {
  router.patch('/users/:id', validate(updateUserSchema), (req, res, next) =>
    userController.update(req, res, next)
  );
  router.get('/check-user', (req, res, next) =>
    userController.getById(req, res, next)
  );
};
