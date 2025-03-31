import { UserController } from '../../modules/user/controller/user-controller';
import { UserRepository } from '../../modules/user/repository/user-repository';
import { UserService } from '../../modules/user/service/user-service';
import { BcryptAdapter } from '../adapters/cryptography/bcrypt-adapter';

export const makeUserController = () => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const hasher = new BcryptAdapter(12);

  return new UserController(userService, hasher);
};
