import { Router } from 'express';
import { makeTimeEntryController } from '../../../common/factories/time-entry-controller-factory';
import { validate } from '../../../common/middlewares/validation-middleware';
import {
  createTimeEntrySchema,
  updateTimeEntrySchema,
} from '../validations/schemas';

const timeEntryController = makeTimeEntryController();

export default (router: Router): void => {
  router.get('/time-entries', (req, res, next) =>
    timeEntryController.getUserTimeEntries(req, res, next)
  );
  router.post(
    '/time-entries',
    validate(createTimeEntrySchema),
    (req, res, next) => timeEntryController.create(req, res, next)
  );
  router.patch(
    '/time-entries/:id',
    validate(updateTimeEntrySchema),
    (req, res, next) => timeEntryController.update(req, res, next)
  );
  router.delete('/time-entries/:id', (req, res, next) =>
    timeEntryController.delete(req, res, next)
  );
};
