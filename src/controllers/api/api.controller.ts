import Controller from '../../types/controller.interface';
import { Router } from 'express';
import ActivityTypesController from './activityTypes/activityTypes.controller';
import ClassesController from './classes/classes.controller';

class ApiController implements Controller {
  public path = ['/api', '/api/v1'];
  public router = Router();
  private activityTypesController: ActivityTypesController;
  private classesController: ClassesController;

  constructor() {
    this.activityTypesController = new ActivityTypesController();
    this.classesController = new ClassesController();
    this.initializeSubControllers();
  }

  private initializeSubControllers() {
    this.path.forEach((path) => {
      this.router.use(path, this.activityTypesController.router);
      this.router.use(path, this.classesController.router);
    });
  }
}

export default ApiController;
