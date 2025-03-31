import { PaymentController } from '../../modules/payment/controller/payment-controller';
import { UserRepository } from '../../modules/user/repository/user-repository';

export const makePaymentController = () => {
  const userRepository = new UserRepository();

  return new PaymentController(userRepository);
};
