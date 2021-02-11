import HttpException from './HttpException';

class InvalidActivityTimesException extends HttpException {
  constructor() {
    super(400, `Invalid activity times`);
  }
}

export default InvalidActivityTimesException;
