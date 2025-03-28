import { Router } from 'express';
import { makeTimeEntryController } from '../../../common/factories/auth/time-entry-controller-factory';
import { validate } from '../../../common/middlewares/validation-middleware';
import {
  CreateTimeEntrySchema,
  UpdateTimeEntrySchema,
} from '../validations/schemas';

const timeEntryController = makeTimeEntryController();

export default (router: Router): void => {
  router.post(
    '/time-entries',
    validate(CreateTimeEntrySchema),
    (req, res, next) => timeEntryController.create(req, res, next)
  );
  router.patch(
    '/time-entries/:id',
    validate(UpdateTimeEntrySchema),
    (req, res, next) => timeEntryController.update(req, res, next)
  );
  router.delete('/time-entries/:id', (req, res, next) =>
    timeEntryController.delete(req, res, next)
  );
};
