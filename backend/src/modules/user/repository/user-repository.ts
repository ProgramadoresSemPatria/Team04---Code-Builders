import { User } from '@prisma/client';
import prisma from '../../../prisma/db';
import { SignUpParams } from '../../auth/service/auth-service';

export class UserRepository {
  async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async create(data: SignUpParams): Promise<User> {
    const { confirmPassword, ...dataToBd } = data;
    const user = await prisma.user.create({ data: dataToBd });
    return user;
  }
  async update(id: number, data: any): Promise<User> {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  }
}
