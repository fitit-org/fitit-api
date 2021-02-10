import express from 'express';
import User from '../../../types/user.interface';

class UsersController {
  public path = '/users';
  public router = express.Router();

  private users: Array<User> = [];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getAllUsers);
  }

  getAllUsers = (
    request: express.Request,
    response: express.Response
  ): void => {
    response.send(this.users);
  };
}

export default UsersController;
