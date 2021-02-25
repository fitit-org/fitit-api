import HttpException from './HttpException'

class UnauthorizedToViewActivityException extends HttpException {
  constructor(id: string) {
    super(403, `Unauthorized to view activity with id ${id}`)
  }
}

export default UnauthorizedToViewActivityException
