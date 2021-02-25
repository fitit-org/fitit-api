import App from './app';
import ApiController from './controllers/api/api.controller';
import AuthenticationController from './controllers/authentication/authentication.controller';
import DocsController from './controllers/docs/docs.controller';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import { MongoHelper } from './utils/mongo.helper';

validateEnv();
MongoHelper.connect().then((db) => {
  console.log('Connected to database');
  const app = new App([
    new ApiController(db),
    new AuthenticationController(db),
    new DocsController(),
  ]);
  app.listen();
});
