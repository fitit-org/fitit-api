import HttpException from './HttpException'

class UnauthorizedToViewUserException extends HttpException {
  constructor(id: string) {
    super(403, `Unauthorized to view user with id ${id}`)
  }
}

export default UnauthorizedToViewUserException
