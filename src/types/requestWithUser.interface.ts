import { Request } from 'express';
import User from '../types/user.interface';

interface RequestWithUser extends Request {
  user: User;
  Headers: {
    authorization: string;
  };
}

export default RequestWithUser;
