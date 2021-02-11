import { Router, Response, NextFunction } from 'express';
import userModel from './user.model';
import activityLogModel from '../activityLogs/activityLog.model';
import activityTypeModel from '../activityTypes/activityType.model';
import classModel from '../classes/class.model';
import authMiddleware from '../../../middleware/auth.middleware';
import RequestWithUser from '../../../types/requestWithUser.interface';
import DBException from '../../../exceptions/DBException';
import UserDto from './user.dto';
import validationMiddleware from '../../../middleware/validation.middleware';
import UserNotFoundException from '../../../exceptions/UserNotFoundException';
import UserNotTeacherException from '../../../exceptions/UserNotTeacherException';
import UnauthorizedToViewUserException from '../../../exceptions/UnauthorizedToViewClassException';

class UsersController {
  public path = '/user';
  public router = Router();

  private user = userModel;
  private activityLog = activityLogModel;
  private activityType = activityTypeModel;
  private class = classModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, authMiddleware, this.getCurrentUser);
    this.router.patch(
      this.path,
      authMiddleware,
      validationMiddleware(UserDto, true),
      this.changeUserData
    );
  }

  private getCurrentUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.user
        .findById(request.user._id)
        .populate({
          path: 'activityLog_ids',
          populate: {
            path: 'activityType_id',
          },
        })
        .populate('class_ids')
        .select(
          'name surname email birthDate dateCreated weight height activityLog_ids class_ids isActive isTeacher'
        )
        .exec();
      response.send(user);
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private getUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.user.findById(request.params._id);
      if (user) {
        if (request.user._id === user._id) {
          try {
            const returnableUser = await this.user
              .findById(request.user._id)
              .populate({
                path: 'activityLog_ids',
                populate: {
                  path: 'activityType_id',
                },
              })
              .populate('class_ids')
              .select(
                'name surname email birthDate dateCreated weight height activityLog_ids class_ids isActive isTeacher'
              )
              .exec();
            response.send(returnableUser);
          } catch (error) {
            console.log(error.stack);
            next(new DBException());
          }
        } else {
          if (request.user.isTeacher) {
            const overlapArray = request.user.class_ids.filter((classId) =>
              user.class_ids.includes(classId)
            );
            if (overlapArray.length > 0) {
              try {
                const returnableUser = await this.user
                  .findById(request.user._id)
                  .populate({
                    path: 'activityLog_ids',
                    populate: {
                      path: 'activityType_id',
                    },
                  })
                  .populate('class_ids')
                  .select(
                    'name surname dateCreated weight height activityLog_ids class_ids isActive isTeacher'
                  )
                  .exec();
                response.send(returnableUser);
              } catch (error) {
                console.log(error.stack);
                next(new DBException());
              }
            } else {
              next(new UnauthorizedToViewUserException(request.params.id));
            }
          } else {
            next(new UserNotTeacherException());
          }
        }
      } else {
        next(new UserNotFoundException(request.params._id));
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };

  private changeUserData = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const userData: UserDto = request.body;
    try {
      const user = await this.user
        .findByIdAndUpdate(request.user._id, userData, { new: true })
        .select(
          'name surname email birthDate dateCreated weight height isActive isTeacher'
        )
        .exec();
      response.send(user);
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };
}

export default UsersController;
