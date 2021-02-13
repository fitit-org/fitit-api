import { cleanEnv, port, str, ValidatorSpec } from 'envalid';

function validateEnv(): void {
  let validationObj: { [x: string]: ValidatorSpec<unknown> } = {
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    PORT: port(),
    JWT_SECRET: str(),
  };
  if (process.env.NODE_ENV === 'production') {
    validationObj = {
      ...validationObj,
      KEY_PATH: str(),
      CERT_PATH: str(),
      CA_PATH: str(),
    };
  }
  cleanEnv(process.env, validationObj);
}

export default validateEnv;
