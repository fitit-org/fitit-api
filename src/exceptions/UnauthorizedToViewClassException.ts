import HttpException from './HttpException';

class UnauthorizedToViewClassException extends HttpException {
  constructor(id: string) {
    super(403, `Unauthorized to view class with id ${id}`);
  }
}

export default UnauthorizedToViewClassException;
