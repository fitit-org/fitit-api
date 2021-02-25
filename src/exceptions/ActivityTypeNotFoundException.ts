import HttpException from './HttpException'

class ActivityTypeNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Activity type with id ${id} not found`)
  }
}

export default ActivityTypeNotFoundException
