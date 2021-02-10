import Controller from '../../types/controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import userModel from '../api/users/user.model';
import LogInDto from './login.dto';
import CreateUserDto from '../api/users/user.dto';
import { hash, compare } from 'bcrypt';
import WrongCredentialsException from '../../exceptions/WrongCredentialsException';
import validationMiddleware from '../../middleware/validation.middleware';
import UserWithThatEmailAlreadyExistsException from '../../exceptions/UserWithThatEmailAlreadyExistsException';
import { getId } from 'reversible-human-readable-id';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  private user = userModel;

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );
  }

  private registration = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = request.body;
    if (await this.user.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    } else {
      const classId = getId(userData.classId);
      const hashedPassword = await hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.hashedPassword = undefined;
      response.send(user);
    }
  };

  private loggingIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await compare(
        logInData.password,
        user.hashedPassword
      );
      if (isPasswordMatching) {
        user.hashedPassword = undefined;
        response.send(user);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };
}

export default AuthenticationController;
