import Controller from '../../../types/controller.interface';
import { Router, Response, Request, NextFunction } from 'express';
import RequestWithUser from '../../../types/requestWithUser.interface';
import authMiddleware from '../../../middleware/auth.middleware';
import classModel from './class.model';
import userModel from '../users/user.model';
import activityLogModel from '../activityLogs/activityLog.model';
import activityTypeModel from '../activityTypes/activityType.model';
import ClassNotFoundException from '../../../exceptions/ClassNotFoundException';
import UnauthorizedToViewClassException from '../../../exceptions/UnauthorizedToViewClassException';
import DBException from '../../../exceptions/DBException';
import UserNotTeacherException from '../../../exceptions/UserNotTeacherException';
import { getHR } from 'reversible-human-readable-id';

class ClassesController implements Controller {
  public path = '/classes';
  public router = Router();
  private class = classModel;
  private user = userModel;
  private activityLog = activityLogModel;
  private activityType = activityTypeModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, authMiddleware, this.getAllClasses);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getClassById);
    this.router.get(
      `${this.path}/:id/users`,
      authMiddleware,
      this.getClassUsers
    );
    this.router.get(`${this.path}/:id/code`, authMiddleware, this.genClassCode);
  }

  private getAllClasses = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const classes = await this.class.find().exec();
      response.send(classes);
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private getClassById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    try {
      const classObject = await this.class.findById(id).exec();
      if (classObject) {
        response.send(classObject);
      } else {
        next(new ClassNotFoundException(id));
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private getClassUsers = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const classObject = await this.class.findById(request.params.id).exec();
      if (classObject) {
        if (request.user.class_ids.includes(classObject._id)) {
          try {
            let users;
            if (request.user.isTeacher) {
              users = await this.user
                .find({ class_ids: classObject._id })
                .populate({
                  path: 'activityLog_ids',
                  populate: {
                    path: 'activityType_id',
                  },
                })
                .select(
                  'name surname class_ids activityLog_ids isActive isTeacher'
                )
                .exec();
            } else {
              users = await this.user
                .find({ class_ids: classObject._id })
                .select('name surname class_ids isActive isTeacher')
                .exec();
            }
            response.send(users);
          } catch (error) {
            console.log(error.stack);
            next(new DBException());
          }
        } else {
          next(new UnauthorizedToViewClassException(request.params.id));
        }
      } else {
        next(new ClassNotFoundException(request.params.id));
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private genClassCode = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const classObject = await this.class.findById(request.params.id).exec();
      if (classObject) {
        if (request.user.class_ids.includes(classObject._id)) {
          if (request.user.isTeacher) {
            const classIdHash = { code: getHR(classObject._id) };
            response.send(classIdHash);
          } else {
            next(new UserNotTeacherException());
          }
        } else {
          next(new UnauthorizedToViewClassException(request.params.id));
        }
      } else {
        next(new ClassNotFoundException(request.params.id));
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };
}

export default ClassesController;
