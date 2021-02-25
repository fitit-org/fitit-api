import HttpException from './HttpException'

class UserAlreadyInClassException extends HttpException {
  constructor(id: string) {
    super(400, `You are already in class with id ${id}`)
  }
}

export default UserAlreadyInClassException
