import Controller from '../../../types/controller.interface';
import { Router, Response, NextFunction } from 'express';
import RequestWithUser from '../../../types/requestWithUser.interface';
import authMiddleware from '../../../middleware/auth.middleware';
import ClassNotFoundException from '../../../exceptions/ClassNotFoundException';
import UnauthorizedToViewClassException from '../../../exceptions/UnauthorizedToViewClassException';
import DBException from '../../../exceptions/DBException';
import UserNotTeacherException from '../../../exceptions/UserNotTeacherException';
import Class from '../../../types/class.interface';
import User from '../../../types/user.interface';
import { populateUser } from '../../../utils/db';
import { MongoHelper } from '../../../utils/mongo.helper';
import { ObjectId } from 'bson';
import { getHR } from 'reversible-human-readable-id';
import CreateClassDto from './class.dto';
import validationMiddleware from '../../../middleware/validation.middleware';

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
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreateClassDto),
      this.createClass
    );
  }

  private getAllClasses = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const classes = (await (await MongoHelper.getDB())
        .collection('classes')
        .find(
          {
            _id: {
              $in: request.user.class_ids as Array<ObjectId>,
            },
          },
          { projection: { humanReadable: 0 } }
        )
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
      const classCount = await (await MongoHelper.getDB())
        .collection('classes')
        .find({ _id: id })
        .limit(1)
        .count();
      if (classCount === 0) {
        return next(new ClassNotFoundException(request.params.id));
      }
      const classObject = (await (await MongoHelper.getDB())
        .collection('classes')
        .findOne(
          {
            _id: id,
          },
          { projection: { humanReadable: 0 } }
        )) as Class;
      return response.send(classObject);
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
      const classCount = await (await MongoHelper.getDB())
        .collection('classes')
        .find({ _id: id })
        .limit(1)
        .count();
      if (classCount === 0) {
        return next(new ClassNotFoundException(request.params.id));
      }
      if (!(request.user.class_ids as Array<ObjectId>).includes(id)) {
        return next(new UnauthorizedToViewClassException(request.params.id));
      }
      const users = (await (await MongoHelper.getDB())
        .collection('users')
        .find(
          { class_ids: id },
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
      const classCount = await (await MongoHelper.getDB())
        .collection('classes')
        .find({ _id: id })
        .limit(1)
        .count();
      if (classCount === 0) {
        return next(new ClassNotFoundException(request.params.id));
      }
      if (!(request.user.class_ids as Array<ObjectId>).includes(id)) {
        return next(new UnauthorizedToViewClassException(request.params.id));
      }
      if (!request.user.isTeacher) {
        return next(new UserNotTeacherException());
      }
      const classCode = ((await (await MongoHelper.getDB())
        .collection('classes')
        .findOne({ _id: id })) as Class).humanReadable;
      return response.send({ code: classCode });
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private createClass = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const classData: CreateClassDto = request.body;
      if (!request.user.isTeacher) {
        return next(new UserNotTeacherException());
      }
      const code = getHR(classData.name);
      const insertResult = await (await MongoHelper.getDB())
        .collection('classes')
        .insertOne({ name: classData.name, code: code, isActive: true });
      const createdClass = (await (await MongoHelper.getDB())
        .collection('classes')
        .findOne({ _id: insertResult.insertedId })) as Class;
      return response.status(201).send(createdClass);
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };
}

export default ClassesController;
