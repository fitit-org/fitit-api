import HttpException from './HttpException'

class NoSuchActivityTypeException extends HttpException {
  constructor(id: string) {
    super(400, `No activity type with id ${id} found`)
  }
}

export default NoSuchActivityTypeException
