import { Router } from 'express';
import { PaymentController } from '../controller/payment-controller';
import { UserRepository } from '../../user/repository/user-repository';

const userRepository = new UserRepository();
const paymentController = new PaymentController(userRepository);

export default (router: Router): void => {
  router.post('/payment', (req, res, next) =>
    paymentController.create(req, res, next)
  );
  router.get('/verify-payment', (req, res, next) => {
    paymentController.verifyPayment(req, res, next);
  });
};
