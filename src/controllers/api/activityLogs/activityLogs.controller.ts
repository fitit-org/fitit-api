import Controller from '../../../types/controller.interface';
import { Router, Response, NextFunction } from 'express';
import RequestWithUser from '../../../types/requestWithUser.interface';
import activityLogModel from './activityLog.model';
import activityTypeModel from '../activityTypes/activityType.model';
import userModel from '../users/user.model';
import DBException from '../../../exceptions/DBException';
import authMiddleware from '../../../middleware/auth.middleware';
import ActivityNotFoundException from '../../../exceptions/ActivityNotFoundException';
import UnauthorizedToViewActivityException from '../../../exceptions/UnauthorizedToViewActivityException';
import AddActivityDto from './activityLog.dto';
import ActivityTypeNotFoundException from '../../../exceptions/ActivityTypeNotFoundException';
import InvalidActivityTimesException from '../../../exceptions/InvalidActivityTimesException';
import validationMiddleware from '../../../middleware/validation.middleware';

class ActivityLogsController implements Controller {
  public path = '/activitylog';
  public router = Router();

  private activityLog = activityLogModel;
  private activityType = activityTypeModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, authMiddleware, this.getActivities);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getActivity);
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(AddActivityDto),
      this.createActivity
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(AddActivityDto, true),
      this.updateActivity
    );
  }

  private getActivities = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const onlyUnfinished = Boolean(request.query.unfinished);
    try {
      if (onlyUnfinished) {
        const onlyUnfinished = await this.activityLog
          .find({
            _id: request.user.activityLog_ids,
            endDate: { $exists: false },
          })
          .populate('activityType_id')
          .exec();
        response.send(onlyUnfinished);
      } else {
        const activities = await this.activityLog
          .findById(request.user.activityLog_ids)
          .populate('activityType_id')
          .exec();
        response.send(activities);
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private getActivity = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const activity = await this.activityLog
        .findById(request.params.id)
        .populate('activityType_id')
        .exec();
      const user = await this.user
        .findOne({ activityLog_ids: activity._id })
        .exec();
      if (activity && user) {
        if (request.user.isTeacher) {
          const overlapArray = request.user.class_ids.filter((classId) =>
            user.class_ids.includes(classId)
          );
          if (overlapArray.length > 0) {
            response.send(activity);
          } else {
            next(new UnauthorizedToViewActivityException(request.params.id));
          }
        } else {
          if (request.user.activityLog_ids.includes(activity._id)) {
            response.send(activity);
          } else {
            next(new UnauthorizedToViewActivityException(request.params.id));
          }
        }
      } else {
        next(new ActivityNotFoundException(request.params.id));
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private createActivity = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const activityObject: AddActivityDto = request.body;
    try {
      const activityType = await this.activityType
        .findById(activityObject.activityType_id)
        .exec();
      if (activityType) {
        if (activityObject.startDate === undefined) {
          activityObject.startDate = new Date();
        }
        if (
          activityObject.endDate &&
          activityObject.endDate < activityObject.startDate
        ) {
          next(new InvalidActivityTimesException());
        }
        const activityDBObject = new this.activityLog(activityObject);
        const createdActivity = await activityDBObject.save();
        await this.user.findByIdAndUpdate(request.user._id, {
          activityLog_ids: [
            ...request.user.activityLog_ids,
            createdActivity._id,
          ],
        });
        response.send(createdActivity);
      } else {
        next(new ActivityTypeNotFoundException(activityObject.activityType_id));
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private updateActivity = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const activityObject: AddActivityDto = request.body;
    try {
      const activity = await this.activityLog
        .findById(request.params.id)
        .exec();
      if (activity) {
        if (request.user.activityLog_ids.includes(request.params.id)) {
          const objectToUpdate = { ...activity, activityObject };
          if (
            objectToUpdate.endDate &&
            objectToUpdate.endDate < objectToUpdate.startDate
          ) {
            next(new InvalidActivityTimesException());
          }
          const updatedActivity = await this.activityLog
            .findByIdAndUpdate(request.params.id, objectToUpdate, { new: true })
            .exec();
          response.send(updatedActivity);
        } else {
          next(new UnauthorizedToViewActivityException(request.params.id));
        }
      } else {
        next(new ActivityNotFoundException(request.params.id));
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };
}

export default ActivityLogsController;
