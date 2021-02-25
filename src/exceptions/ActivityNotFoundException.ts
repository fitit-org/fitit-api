import HttpException from './HttpException'

class ActivityNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Activity with id ${id} not found`)
  }
}

export default ActivityNotFoundException
