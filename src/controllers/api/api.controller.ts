import Controller from '../../types/controller.interface';
import { Router } from 'express';
import ActivityTypesController from './activityTypes/activityTypes.controller';
import ClassesController from './classes/classes.controller';
import UsersController from './users/users.controller';
import ActivityLogsController from './activityLogs/activityLogs.controller';
import AuthenticationController from '../authentication/authentication.controller';

class ApiController implements Controller {
  public path = ['/api', '/api/v1'];
  public router = Router();
  private activityTypesController: ActivityTypesController;
  private classesController: ClassesController;
  private usersController: UsersController;
  private activityLogsController: ActivityLogsController;
  private authenticationController: AuthenticationController;

  constructor() {
    this.activityTypesController = new ActivityTypesController();
    this.classesController = new ClassesController();
    this.usersController = new UsersController();
    this.activityLogsController = new ActivityLogsController();
    this.authenticationController = new AuthenticationController();
    this.initializeSubControllers();
  }

  private initializeSubControllers() {
    this.path.forEach((path) => {
      this.router.use(path, this.activityTypesController.router);
      this.router.use(path, this.classesController.router);
      this.router.use(path, this.usersController.router);
      this.router.use(path, this.activityLogsController.router);
      this.router.use(path, this.authenticationController.router);
    });
  }
}

export default ApiController;
