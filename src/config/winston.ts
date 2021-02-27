import appRoot from 'app-root-path'
import winston from 'winston'

const devOptions = {
  file: {
    level: 'info',
    filename: `${appRoot}/dev.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
}

const prodOptions = {
  level: 'warn',
  filename: '/var/log/fitit-api.log',
  handleExceptions: true,
  json: true,
  maxsize: 5242880 * 2,
  maxFiles: 10,
  colorize: false,
}

const logger = winston.createLogger({
  transports:
    process.env.NODE_ENV === 'production'
      ? [new winston.transports.File(prodOptions)]
      : [
          new winston.transports.File(devOptions.file),
          new winston.transports.Console(devOptions.console),
        ],
  exitOnError: false,
})

export class LoggerStream {
  write(message: string): void {
    logger.info(message)
  }
}

export { logger }
