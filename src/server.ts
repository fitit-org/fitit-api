import App from './app';
import ApiController from './controllers/api/api.controller';
import AuthenticationController from './controllers/authentication/authentication.controller';
import DocsController from './controllers/docs/docs.controller';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new ApiController(),
  new AuthenticationController(),
  new DocsController(),
]);

app.listen();
