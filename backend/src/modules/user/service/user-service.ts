import {
  NotFound,
  UnprocessableEntity,
} from '../../../common/errors/http-errors';
import { UserRepository } from '../repository/user-repository';

export type UpdateUserParams = {
  id: number;
  name?: string;
  email?: string;
  serviceType?: string;
  password?: string;
  phone?: string;
  address?: string;
  city?: string;
  neighborhood?: string;
  postalCode?: string;
  isPaymentDone?: boolean;
};

export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async update(data: UpdateUserParams) {
    const { id, email } = data;

    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFound('Usuário não encontrado');

    if (email) {
      const user = await this.userRepository.getByEmail(email);

      if (user?.email === email && user?.id !== id)
        throw new UnprocessableEntity('Já existe um usuário com esse e-mail');
    }

    await this.userRepository.update(data);
  }

  async getById(id: number) {
    const user = await this.userRepository.getById(id);
    return user;
  }
}
