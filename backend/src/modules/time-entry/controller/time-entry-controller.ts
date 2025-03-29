import { NextFunction, Request, Response } from 'express';

import { TimeEntryService } from '../service/time-entry-service';

export class TimeEntryController {
  constructor(private readonly timeEntryService: TimeEntryService) {
    this.timeEntryService = timeEntryService;
  }

  async getUserTimeEntries(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;

      const timeEntries = await this.timeEntryService.getUserTimeEntries(
        userId
      );

      res.status(200).json(timeEntries);
    } catch (error) {
      console.log('Erro ao obter temporizadores: ', error);
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const dataToSave = { userId: req.userId, ...data };

      await this.timeEntryService.create(dataToSave);

      res.status(201).json({ message: 'Temporizador criado com sucesso!' });
    } catch (error) {
      console.log('Erro ao criar temporizador: ', error);
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const id = Number(req.params.id);

      const dataToUpdate = { userId: req.userId, id, ...data };

      await this.timeEntryService.update(dataToUpdate);

      res.status(201).json({ message: 'Temporizador atualizado com sucesso!' });
    } catch (error) {
      console.log('Erro ao atualizar temporizador: ', error);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const userId = req.userId!;

      await this.timeEntryService.delete(id, userId);

      res.status(200).json({ message: 'Temporizador excluído com sucesso!' });
    } catch (error) {
      console.log('Erro ao excluir temporizador: ', error);
      next(error);
    }
  }
}
