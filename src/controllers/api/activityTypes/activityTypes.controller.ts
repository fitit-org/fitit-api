import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../../types/controller.interface';
import activityTypeModel from './activityType.model';
import ActivityTypeNotFoundException from '../../../exceptions/ActivityTypeNotFoundException';
import DBException from '../../../exceptions/DBException';

class ActivityTypesController implements Controller {
  public path = '/activitytypes';
  public router = Router();
  private activityType = activityTypeModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllActivityTypes);
    this.router.get(`${this.path}/:id`, this.getActivityTypeById);
  }

  private getAllActivityTypes = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const allActivities = await this.activityType.find();
      response.send(allActivities);
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private getActivityTypeById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    try {
      const activityType = await this.activityType.findById(id);
      if (activityType) {
        response.send(activityType);
      } else {
        next(new ActivityTypeNotFoundException(id));
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };
}

export default ActivityTypesController;
