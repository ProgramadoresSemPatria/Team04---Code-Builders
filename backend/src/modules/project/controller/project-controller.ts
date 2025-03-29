import { NextFunction, Request, Response } from 'express';
import { ProjectService } from '../service/project-service';

export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
    this.projectService = projectService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const dataToSave = { userId: req.userId, ...data };

      await this.projectService.create(dataToSave);

      res.status(201).json({ message: 'Projeto criado com sucesso!' });
    } catch (error) {
      console.log('Erro ao criar projeto: ', error);
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const id = Number(req.params.id);

      const dataToUpdate = { id, userId: req.userId, ...data };

      await this.projectService.update(dataToUpdate);

      res.status(200).json({ message: 'Projeto atualizado com sucesso!' });
    } catch (error) {
      console.log('Erro ao atualizar projeto: ', error);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const userId = req.userId!;

      await this.projectService.delete(id, userId);

      res.status(200).json({ message: 'Projeto excluído com sucesso!' });
    } catch (error) {
      console.log('Erro ao excluir projeto: ', error);
      next(error);
    }
  }
  async getUserProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;

      const projects = await this.projectService.getUserProjects(userId);

      res.status(200).json(projects);
    } catch (error) {
      console.log('Erro ao obter projetos: ', error);
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const id = Number(req.params.id);

      const project = await this.projectService.getById(id, userId);

      res.status(200).json(project);
    } catch (error) {
      console.log('Erro ao obter projeto: ', error);
      next(error);
    }
  }
}
