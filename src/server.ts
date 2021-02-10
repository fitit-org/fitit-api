import App from './app';
import ApiController from './controllers/api/api.controller';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new ApiController()]);

app.listen();
