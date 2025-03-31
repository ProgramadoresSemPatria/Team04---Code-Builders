import { Router } from 'express';
import { makePaymentController } from '../../../common/factories/payment-controller-factory';

const paymentController = makePaymentController();

export default (router: Router): void => {
  router.post('/payment', (req, res, next) =>
    paymentController.create(req, res, next)
  );
  router.get('/verify-payment', (req, res, next) => {
    paymentController.verifyPayment(req, res, next);
  });
};
