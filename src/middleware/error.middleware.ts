// NextFunction has to be provided (despite not being used) so that the middleware is recognized by express as error-handling
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({ status, message });
}

export default errorMiddleware;
