import { Router } from 'express'

interface Controller {
  path: string | Array<string>
  router: Router
}

export default Controller
