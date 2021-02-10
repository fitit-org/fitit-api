import HttpException from './HttpException';

class NoSuchClassException extends HttpException {
  constructor(readable: string) {
    super(400, `No class identified by ${readable} found.`);
  }
}

export default NoSuchClassException;
