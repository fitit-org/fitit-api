import HttpException from './HttpException'

class UserIsTeacherException extends HttpException {
  constructor() {
    super(403, `Only a pupil is authorized to view this resource`)
  }
}

export default UserIsTeacherException
