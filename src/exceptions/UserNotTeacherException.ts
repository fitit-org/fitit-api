import HttpException from './HttpException'

class UserNotTeacherException extends HttpException {
  constructor() {
    super(403, `Only a teacher is authorized to view this resource`)
  }
}

export default UserNotTeacherException
