import HttpException from './HttpException';

class DBException extends HttpException {
  constructor() {
    super(500, `Internal error`);
  }
}

export default DBException;
