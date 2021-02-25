import Controller from '../../types/controller.interface';
import { Router } from 'express';
import ActivityTypesController from './activityTypes/activityTypes.controller';
import ClassesController from './classes/classes.controller';
import UsersController from './users/users.controller';
import ActivityLogsController from './activityLogs/activityLogs.controller';
import AuthenticationController from '../authentication/authentication.controller';
import { Db } from 'mongodb';

class ApiController implements Controller {
  public path = ['/api', '/api/v1'];
  public router = Router();
  private activityTypesController: ActivityTypesController;
  private classesController: ClassesController;
  private usersController: UsersController;
  private activityLogsController: ActivityLogsController;
  private authenticationController: AuthenticationController;

  constructor(db: Db) {
    this.activityTypesController = new ActivityTypesController(db);
    this.classesController = new ClassesController(db);
    this.usersController = new UsersController(db);
    this.activityLogsController = new ActivityLogsController(db);
    this.authenticationController = new AuthenticationController(db);
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
