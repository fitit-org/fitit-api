import Controller from '../../../types/controller.interface';
import { Router, Response, Request, NextFunction } from 'express';
import RequestWithUser from '../../../types/requestWithUser.interface';
import authMiddleware from '../../../middleware/auth.middleware';
import classModel from './class.model';
import userModel from '../users/user.model';
import ClassNotFoundException from '../../../exceptions/ClassNotFoundException';
import UnauthorizedToViewClassException from '../../../exceptions/UnauthorizedToViewClassException';

class ClassesController implements Controller {
  public path = '/classes';
  public router = Router();
  private class = classModel;
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, authMiddleware, this.getAllClasses);
    this.router.get(`${this.path}/:id`, authMiddleware, this.getClassById);
  }

  private getAllClasses = async (request: Request, response: Response) => {
    const classes = await this.class.find();
    response.send(classes);
  };

  private getClassById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const classObject = this.class.findById(id);
    if (classObject) {
      response.send(classObject);
    } else {
      next(new ClassNotFoundException(id));
    }
  };

  private getClassUsers = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const classObject = await this.class.findById(request.params.id);
    if (classObject) {
      if (request.user.class_ids.includes(classObject._id)) {
        const users = await this.user
          .find({ class_ids: classObject._id })
          .select(
            'name surname activityLog_ids isActive isTeacher birthDate height weight'
          )
          .populate('activityLog_ids');
        response.send(users);
      } else {
        next(new UnauthorizedToViewClassException(request.params.id));
      }
    } else {
      next(new ClassNotFoundException(request.params.id));
    }
  };
}

export default ClassesController;
