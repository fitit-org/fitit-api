import Controller from '../../../types/controller.interface';
import { Router, Response, NextFunction } from 'express';
import RequestWithUser from '../../../types/requestWithUser.interface';
import DBException from '../../../exceptions/DBException';
import authMiddleware from '../../../middleware/auth.middleware';
import ActivityNotFoundException from '../../../exceptions/ActivityNotFoundException';
import UnauthorizedToViewActivityException from '../../../exceptions/UnauthorizedToViewActivityException';
import AddActivityDto from './activityLog.dto';
import InvalidActivityTimesException from '../../../exceptions/InvalidActivityTimesException';
import validationMiddleware from '../../../middleware/validation.middleware';
import ActivityLog from '../../../types/activityLog.interface';
import User from '../../../types/user.interface';
import { populateActivities, populateActivity } from '../../../utils/db';
import { MongoHelper } from '../../../utils/mongo.helper';
import { ObjectId } from 'bson';
import NoSuchActivityTypeException from '../../../exceptions/NoSuchActivityTypeException';
import { FilterQuery } from 'mongodb';

class ActivityLogsController implements Controller {
  public path = '/activitylog';
  public router = Router();

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
    try {
      const query: FilterQuery<unknown> = {
        _id: { $in: request.user.activityLog_ids },
      };
      if (Boolean(request.query.unfinished)) {
        query.endDate = { $exists: false };
      }
      let activities = (await (await MongoHelper.getDB())
        .collection('activityLogs')
        .find(query)
        .toArray()) as Array<ActivityLog>;
      activities = await populateActivities(
        await MongoHelper.getDB(),
        activities
      );
      return response.send(activities);
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private getActivity = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ActivityNotFoundException(request.params.id));
      }
      let activity = (await (await MongoHelper.getDB())
        .collection('activityLogs')
        .findOne({
          _id: new ObjectId(request.params.id),
        })) as ActivityLog;
      if (!activity) {
        return next(new ActivityNotFoundException(request.params.id));
      }
      if (request.user.isTeacher) {
        const activityUser = (await (await MongoHelper.getDB())
          .collection('users')
          .findOne({
            activityLog_ids: activity._id,
          })) as User;
        let hasOverlap = false;
        for (const teacherClassId of request.user
          .class_ids as Array<ObjectId>) {
          for (const userClassId of activityUser.class_ids as Array<ObjectId>) {
            if (teacherClassId.equals(userClassId)) {
              hasOverlap = true;
              break;
            }
          }
        }
        if (!hasOverlap) {
          return next(
            new UnauthorizedToViewActivityException(request.params.id)
          );
        }
        activity = await populateActivity(await MongoHelper.getDB(), activity);
        return response.send(activity);
      }
      let hasActivity = false;
      for (const id of request.user.activityLog_ids as Array<ObjectId>) {
        if (id.equals(activity._id)) {
          hasActivity = true;
          break;
        }
      }
      if (!hasActivity) {
        return next(new UnauthorizedToViewActivityException(request.params.id));
      }
      activity = await populateActivity(await MongoHelper.getDB(), activity);
      return response.send(activity);
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private createActivity = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const activityObject: AddActivityDto = request.body;
    try {
      const activityTypeCount = await (await MongoHelper.getDB())
        .collection('activityTypes')
        .find({
          _id: new ObjectId(activityObject.activityType_id),
        })
        .count();
      if (activityTypeCount === 0) {
        return next(
          new NoSuchActivityTypeException(activityObject.activityType_id)
        );
      }
      const activityInsertObject: Record<string, unknown> = {};
      activityInsertObject.activityType_id = new ObjectId(
        activityObject.activityType_id
      );
      activityInsertObject.startDate = activityObject.startDate
        ? new Date(activityObject.startDate)
        : new Date();
      if (activityObject.endDate) {
        activityInsertObject.endDate = new Date(activityObject.endDate);
        if (activityInsertObject.endDate < activityInsertObject.startDate) {
          return next(new InvalidActivityTimesException());
        }
      }
      const insertResult = await (await MongoHelper.getDB())
        .collection('activityLogs')
        .insertOne(activityInsertObject);
      await (await MongoHelper.getDB()).collection('users').updateOne(
        { _id: request.user._id },
        {
          $push: { activityLog_ids: insertResult.insertedId },
        }
      );
      let createdActivity = (await (await MongoHelper.getDB())
        .collection('activityLogs')
        .findOne({
          _id: insertResult.insertedId,
        })) as ActivityLog;
      createdActivity = await populateActivity(
        await MongoHelper.getDB(),
        createdActivity
      );
      return response.status(201).send(createdActivity);
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private updateActivity = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const activityObject: AddActivityDto = request.body;
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ActivityNotFoundException(request.params.id));
      }
      const paramId = new ObjectId(request.params.id);
      const activity = (await (await MongoHelper.getDB())
        .collection('activityLogs')
        .findOne({
          _id: paramId,
        })) as ActivityLog;
      if (!activity) {
        return next(new ActivityNotFoundException(request.params.id));
      }
      let hasActivity = false;
      if (request.user.activityLog_ids) {
        for (const id of request.user.activityLog_ids as Array<ObjectId>) {
          if (id.equals(new ObjectId(request.params.id))) {
            hasActivity = true;
            break;
          }
        }
      }
      if (!hasActivity) {
        return next(new UnauthorizedToViewActivityException(request.params.id));
      }
      const mergedActivityUpdateObject: Record<string, unknown> = {};
      if (activityObject.activityType_id) {
        const activityTypeId = new ObjectId(activityObject.activityType_id);
        const activityTypeLength = await (await MongoHelper.getDB())
          .collection('activityTypes')
          .find({
            _id: activityTypeId,
          })
          .count();
        if (activityTypeLength === 0) {
          return next(
            new NoSuchActivityTypeException(activityObject.activityType_id)
          );
        }
        mergedActivityUpdateObject.activityType_id = activityTypeId;
      }
      mergedActivityUpdateObject.startDate = activityObject.startDate
        ? new Date(activityObject.startDate)
        : activity.startDate;
      if (activityObject.endDate || activity.endDate) {
        mergedActivityUpdateObject.endDate = activityObject.endDate
          ? new Date(activityObject.endDate)
          : activity.endDate;
        if (
          mergedActivityUpdateObject.endDate <
          mergedActivityUpdateObject.startDate
        ) {
          return next(new InvalidActivityTimesException());
        }
      }
      await (await MongoHelper.getDB())
        .collection('activityLogs')
        .updateOne({ _id: paramId }, { $set: mergedActivityUpdateObject });
      let updatedActivity = (await (await MongoHelper.getDB())
        .collection('activityLogs')
        .findOne({
          _id: paramId,
        })) as ActivityLog;
      updatedActivity = await populateActivity(
        await MongoHelper.getDB(),
        updatedActivity
      );
      return response.send(updatedActivity);
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };
}

export default ActivityLogsController;
