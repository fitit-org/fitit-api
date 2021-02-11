import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../controllers/api/users/user.model';
import RequestWithUser from '../types/requestWithUser.interface';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../types/dataStoredInToken.interface';

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authToken = getToken(request);
  if (authToken !== undefined) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(
        authToken,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

function getToken(request: RequestWithUser): string | undefined {
  if (
    request.headers.authorization &&
    request.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return request.headers.authorization.split(' ')[1];
  } else if (request.query && request.query.token) {
    return request.query.token as string;
  } else if (request.headers.cookie) {
    const rawCookies = request.headers.cookie.split('; ');
    const parsedCookies: { [key: string]: string } = {};
    rawCookies.forEach((rawCookie) => {
      const parsedCookie = rawCookie.split('=');
      parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    if (parsedCookies['token']) {
      return parsedCookies['token'];
    }
    return undefined;
  }
  return undefined;
}

export default authMiddleware;