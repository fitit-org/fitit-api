import HttpException from './HttpException'
import { logger } from '../config/winston'

class DBException extends HttpException {
  constructor(err: { message?: string; stack?: unknown }) {
    super(500, `Internal error`)
    this.log(err)
  }

  private log(err: { message?: string; stack?: unknown }): void {
    if (err.stack !== undefined && err.message !== undefined) {
      logger.error(err.message, { metadata: err.stack })
    }
  }
}

export default DBException
