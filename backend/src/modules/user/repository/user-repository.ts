import { User } from '@prisma/client';
import prisma from '../../../prisma/db';
import { SignUpParams } from '../../auth/service/auth-service';
import { UpdateUserParams } from '../service/user-service';

export class UserRepository {
  async getById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async create(data: SignUpParams): Promise<User> {
    const { confirmPassword, ...dataToBd } = data;
    const user = await prisma.user.create({ data: dataToBd });
    return user;
  }
  async update(data: UpdateUserParams): Promise<User> {
    const { id, ...dataToUpdate } = data;
    const user = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
    return user;
  }
}
