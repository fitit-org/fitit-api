import Controller from '../../types/controller.interface';
import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import apiSchema = require('../../assets/fitit-openapi.json');

class DocsController implements Controller {
  public path = '/docs';
  public router = Router();

  constructor() {
    this.router.use('/docs', swaggerUI.serve);
    this.router.get('/docs', swaggerUI.setup(apiSchema));
  }
}

export default DocsController;
