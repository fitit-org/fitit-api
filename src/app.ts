import express, { Request, Response } from 'express'
import { json } from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
//import morgan from 'morgan';
import Controller from './types/controller.interface'
import errorMiddleware from './middleware/error.middleware'
import { createServer, Server } from 'https'
import { readFileSync } from 'fs'

class App {
  public app: express.Application
  private insecureApp: express.Application
  private secureApp: Server

  constructor(controllers: Array<Controller>) {
    this.app = express()
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(json())
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(compression())
    /*if (process.env.NODE_ENV !== 'production') {
      this.app.use(morgan('combined'));
    }*/
  }

  private initializeControllers(controllers: Array<Controller>) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
    this.app.get('/', function (req: Request, res: Response) {
      res.redirect('/docs')
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  private setupInsecureRedirects() {
    this.insecureApp = express()
    this.insecureApp.get('*', function (req: Request, res: Response) {
      if (!req.secure || req.protocol === 'http') {
        res.redirect(`https://${req.headers.host}${req.url}`)
      }
    })
  }

  private setupSecureServer() {
    const keyFile = readFileSync(process.env.KEY_PATH)
    const certFile = readFileSync(process.env.CERT_PATH)
    const caFile = readFileSync(process.env.CA_PATH)
    const credentials = {
      key: keyFile,
      cert: certFile,
      ca: caFile,
    }
    this.secureApp = createServer(credentials, this.app)
  }

  public listen(): void {
    if (process.env.NODE_ENV !== 'production') {
      this.app.listen(process.env.PORT, () => {
        console.log(`FitIT API listening on the port ${process.env.PORT}`)
      })
    } else {
      this.setupInsecureRedirects()
      this.setupSecureServer()
      this.secureApp.listen(443, () => {
        console.log('Server running on port 443')
      })
      this.insecureApp.listen(80, () => {
        console.log('Insecure server with redirects running on port 80')
      })
    }
  }
}

export default App
