import { Router, Response, NextFunction } from 'express';
import authMiddleware from '../../../middleware/auth.middleware';
import RequestWithUser from '../../../types/requestWithUser.interface';
import DBException from '../../../exceptions/DBException';
import UserDto from './user.dto';
import validationMiddleware from '../../../middleware/validation.middleware';
import UserNotFoundException from '../../../exceptions/UserNotFoundException';
import UnauthorizedToViewUserException from '../../../exceptions/UnauthorizedToViewUserException';
import User from '../../../types/user.interface';
import { populateUser } from '../../../utils/db';
import { MongoHelper } from '../../../utils/mongo.helper';
import { ObjectId } from 'bson';

class UsersController {
  public path = '/user';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, authMiddleware, this.getCurrentUser);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getUser);
    this.router.patch(
      this.path,
      authMiddleware,
      validationMiddleware(UserDto, true),
      this.changeUserData
    );
    this.router.delete(this.path, authMiddleware, this.removeUser);
  }

  private getCurrentUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const userObject = await populateUser(
        await MongoHelper.getDB(),
        request.user
      );
      return response.send(userObject);
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private getUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new UserNotFoundException(request.params.id));
      }
      const userId = new ObjectId(request.params.id);
      if (userId.equals(request.user._id)) {
        const userObject = await populateUser(
          await MongoHelper.getDB(),
          request.user
        );
        return response.send(userObject);
      }
      const userCount = await (await MongoHelper.getDB())
        .collection('users')
        .find({
          _id: userId,
        })
        .limit(1)
        .count();
      if (userCount === 0) {
        return next(new UserNotFoundException(request.params.id));
      }
      const user = (await (await MongoHelper.getDB())
        .collection('users')
        .findOne({ _id: userId })) as User;
      let hasOverlap = false;
      for (const classId of user.class_ids as Array<ObjectId>) {
        for (const userClassId of request.user.class_ids as Array<ObjectId>) {
          if (classId.equals(userClassId)) {
            hasOverlap = true;
            break;
          }
        }
      }
      if (!hasOverlap) {
        return next(new UnauthorizedToViewUserException(request.params.id));
      }
      const userObject = await populateUser(await MongoHelper.getDB(), user);
      delete userObject.birthDate;
      delete userObject.email;
      delete userObject.hashedPassword;
      delete userObject.height;
      delete userObject.weight;
      if (!request.user.isTeacher) {
        delete userObject.activityLog_ids;
      }
      return response.send(userObject);
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };

  private changeUserData = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const userData: UserDto = request.body;
    try {
      await (await MongoHelper.getDB())
        .collection('users')
        .updateOne({ _id: request.user._id }, { $set: userData });
      const user = (await (await MongoHelper.getDB())
        .collection('users')
        .findOne(
          { _id: request.user._id },
          { projection: { hashedPassword: 0 } }
        )) as User;
      const populatedUser = await populateUser(await MongoHelper.getDB(), user);
      response.send(populatedUser);
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private removeUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (request.user.activityLog_ids) {
        await (await MongoHelper.getDB())
          .collection('activityLogs')
          .deleteMany({
            _id: {
              $in: request.user.activityLog_ids as Array<ObjectId>,
            },
          });
      }
      const userRemovalSuccess = await (await MongoHelper.getDB())
        .collection('users')
        .deleteOne({
          _id: request.user._id,
        });
      if (userRemovalSuccess.deletedCount === 1) {
        return response.status(204).send();
      } else {
        return next(new DBException());
      }
    } catch (error) {
      console.log(error.stack);
      return next(new DBException());
    }
  };
}

export default UsersController;
