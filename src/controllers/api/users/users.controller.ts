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
      if (user) {
        response.send(user);
      } else {
        // TODO: Critical! Invalidate token here
        next(new UserNotFoundException(request.user._id));
      }
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
      const user = await this.user.findById(request.params._id).exec();
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
          const overlapArray = request.user.class_ids.filter((classId) =>
            user.class_ids.includes(classId)
          );
          if (overlapArray.length > 0) {
            if (user.isTeacher) {
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
                    'name surname activityLog_ids class_ids isActive isTeacher'
                  )
                  .exec();
                response.send(returnableUser);
              } catch (error) {
                console.log(error.stack);
                next(new DBException());
              }
            } else {
              try {
                const returnableUser = await this.user
                  .findById(request.user._id)
                  .populate('class_ids')
                  .select('name surname class_ids isActive isTeacher')
                  .exec();
                response.send(returnableUser);
              } catch (error) {
                console.log(error.stack);
                next(new DBException());
              }
            }
          } else {
            next(new UnauthorizedToViewUserException(request.params.id));
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

  private removeUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      try {
        const userActivities = await this.user
          .findById(request.user._id)
          .select('activityLog_ids -_id')
          .exec();
        let activityRemovalSuccess: unknown;
        if (userActivities) {
          activityRemovalSuccess = await this.activityLog
            .findByIdAndDelete(userActivities)
            .exec();
        } else {
          activityRemovalSuccess = true;
        }
        const userRemovalSuccess = await this.user.findByIdAndDelete(
          request.user._id
        );
        if (activityRemovalSuccess && userRemovalSuccess) {
          response.send(200);
          // Client should remove the token here
          // TODO: Invalidate the token server-side
        } else {
          next(new DBException());
        }
      } catch (error) {
        console.log(error.stack);
        next(new DBException());
      }
    } catch (error) {
      console.log(error.stack);
      next(new DBException());
    }
  };
}

export default UsersController;
