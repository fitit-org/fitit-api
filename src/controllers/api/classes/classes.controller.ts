import Controller from '../../../types/controller.interface';
import { Router, Response, NextFunction } from 'express';
import RequestWithUser from '../../../types/requestWithUser.interface';
import authMiddleware from '../../../middleware/auth.middleware';
import ClassNotFoundException from '../../../exceptions/ClassNotFoundException';
import UnauthorizedToViewClassException from '../../../exceptions/UnauthorizedToViewClassException';
import DBException from '../../../exceptions/DBException';
import UserNotTeacherException from '../../../exceptions/UserNotTeacherException';
import { getHR } from 'reversible-human-readable-id';
import Class from '../../../types/class.interface';
import User from '../../../types/user.interface';
import { populateUser } from '../../../utils/db';
import { MongoHelper } from '../../../utils/mongo.helper';
import { ObjectId } from 'bson';

class ClassesController implements Controller {
  public path = '/classes';
  public router = Router();

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
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const classes = (await (await MongoHelper.getDB())
        .collection('classes')
        .find({}, { projection: { humanReadable: 0 } })
        .toArray()) as Array<Class>;
      return response.send(classes);
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private getClassById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ClassNotFoundException(request.params.id));
      }
      const id = new ObjectId(request.params.id);
      const classObject = (await (await MongoHelper.getDB())
        .collection('classes')
        .findOne(
          {
            _id: id,
          },
          { projection: { humanReadable: 0 } }
        )) as Class;
      if (classObject) {
        return response.send(classObject);
      } else {
        return next(new ClassNotFoundException(request.params.id));
      }
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private getClassUsers = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ClassNotFoundException(request.params.id));
      }
      const id = new ObjectId(request.params.id);
      const classObject = (await (await MongoHelper.getDB())
        .collection('classes')
        .findOne({
          _id: id,
        })) as Class;
      if (classObject) {
        if (
          (request.user.class_ids as Array<ObjectId>).includes(classObject._id)
        ) {
          const users = (await (await MongoHelper.getDB())
            .collection('users')
            .find(
              { class_ids: classObject._id },
              {
                projection: {
                  hashedPassword: 0,
                  email: 0,
                  birthDate: 0,
                  weight: 0,
                  height: 0,
                },
              }
            )
            .toArray()) as Array<User>;
          if (request.user.isTeacher) {
            for (let user of users) {
              user = await populateUser(await MongoHelper.getDB(), user, false);
            }
          } else {
            users.forEach((user) => {
              delete user.activityLog_ids;
            });
          }
          return response.send(users);
        } else {
          return next(new UnauthorizedToViewClassException(request.params.id));
        }
      } else {
        return next(new ClassNotFoundException(request.params.id));
      }
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private genClassCode = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ClassNotFoundException(request.params.id));
      }
      const id = new ObjectId(request.params.id);
      const classObject = (await (await MongoHelper.getDB())
        .collection('classes')
        .findOne({
          _id: id,
        })) as Class;
      if (classObject) {
        if (
          (request.user.class_ids as Array<ObjectId>).includes(classObject._id)
        ) {
          if (request.user.isTeacher) {
            const classIdHash = { code: classObject.humanReadable };
            return response.send(classIdHash);
          } else {
            return next(new UserNotTeacherException());
          }
        } else {
          return next(new UnauthorizedToViewClassException(request.params.id));
        }
      } else {
        return next(new ClassNotFoundException(request.params.id));
      }
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };
}

export default ClassesController;
