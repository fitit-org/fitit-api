import Controller from '../../types/controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import userModel from '../api/users/user.model';
import classModel from '../api/classes/class.model';
import User from '../../types/user.interface';
import LogInDto from './login.dto';
import CreateUserDto from '../api/users/user.dto';
import { hash, compare } from 'bcrypt';
import WrongCredentialsException from '../../exceptions/WrongCredentialsException';
import validationMiddleware from '../../middleware/validation.middleware';
import UserWithThatEmailAlreadyExistsException from '../../exceptions/UserWithThatEmailAlreadyExistsException';
import NoSuchClassException from '../../exceptions/NoSuchClassException';
import { getId } from 'reversible-human-readable-id';
import DataStoredInToken from '../../types/dataStoredInToken.interface';
import TokenData from '../../types/tokenData.interface';
import { sign } from 'jsonwebtoken';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  private user = userModel;
  private class = classModel;

  constructor() {
    this.initializeRoutes();
  }

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
      const classObject = await this.class.findById(getId(userData.classId));
      if (classObject) {
        const hashedPassword = await hash(userData.password, 10);
        const isTeacher = userData.isTeacher;
        delete userData.classId;
        delete userData.password;
        delete userData.isTeacher;
        const userObject: User = {
          ...userData,
          hashedPassword: hashedPassword,
          isActive: true,
          class_ids: [classObject._id],
          dateCreated: new Date(),
          isTeacher: isTeacher !== undefined ? isTeacher : false,
        };
        const user = await this.user.create(userObject);
        user.hashedPassword = undefined;
        const tokenData = this.createToken(user);
        response.setHeader('authorization', tokenData.token);
        response.send({ ...user, token: tokenData.token });
      } else {
        next(new NoSuchClassException(userData.classId));
      }
    }
  };

  private loggingIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    console.log('Got email: ', logInData.email);
    console.log(user);
    if (user) {
      const isPasswordMatching = await compare(
        logInData.password,
        user.get('hashedPassword', null, { getters: false })
      );
      if (isPasswordMatching) {
        user.hashedPassword = undefined;
        const tokenData = this.createToken(user);
        response.send({ ...user, token: tokenData.token });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationController;
