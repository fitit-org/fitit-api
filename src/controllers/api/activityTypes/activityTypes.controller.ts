import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../../types/controller.interface';
import activityTypeModel from './activityType.model';
import ActivityTypeNotFoundException from '../../../exceptions/ActivityTypeNotFoundException';

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
    response: Response
  ) => {
    const allActivities = await this.activityType.find();
    response.send(allActivities);
  };

  private getActivityTypeById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const activityType = await this.activityType.findById(id);
    if (activityType) {
      response.send(activityType);
    } else {
      next(new ActivityTypeNotFoundException(id));
    }
  };
}

export default ActivityTypesController;
