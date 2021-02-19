import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../../types/controller.interface';
import ActivityTypeNotFoundException from '../../../exceptions/ActivityTypeNotFoundException';
import DBException from '../../../exceptions/DBException';
import ActivityType from '../../../types/activityType.interface';
import { MongoHelper } from '../../../utils/mongo.helper';
import { ObjectId } from 'bson';

class ActivityTypesController implements Controller {
  public path = '/activitytypes';
  public router = Router();

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
      const allActivities = (await (await MongoHelper.getDB())
        .collection('activityTypes')
        .find({})
        .toArray()) as Array<ActivityType>;
      return response.send(allActivities);
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private getActivityTypeById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ActivityTypeNotFoundException(request.params.id));
      }
      const activityType = (await (await MongoHelper.getDB())
        .collection('activityTypes')
        .findOne({
          _id: new ObjectId(request.params.id),
        })) as ActivityType;
      if (!activityType) {
        return next(new ActivityTypeNotFoundException(request.params.id));
      }
      return response.send(activityType);
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };
}

export default ActivityTypesController;
