import { NextFunction, Request, Response } from 'express';
import { Hasher } from '../../auth/protocols/hasher';
import { UserService } from '../service/user-service';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly hasher: Hasher
  ) {
    (this.userService = userService), (this.hasher = hasher);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      let data = req.body;
      const id = req.params.id;
      const { password } = data;

      if (password) {
        const hashedPassword = await this.hasher.hash(password);
        data.password = hashedPassword;
      }

      await this.userService.update({ id: Number(id), ...data });

      res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getById(req.userId!);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
