import HttpException from './HttpException'

class ClassNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Class with id ${id} not found`)
  }
}

export default ClassNotFoundException
