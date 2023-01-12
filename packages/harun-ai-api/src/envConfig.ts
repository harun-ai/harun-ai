import { cleanEnv, str, url } from 'envalid';
import { config } from 'dotenv';

config();

const getEnvs = () => {
  return cleanEnv(process.env, {
    NODE_ENV: str({
      desc: 'Environment mode that the app is running.',
      choices: ['development', 'test', 'production'],
    }),
    OPENAI_API_KEY: str({
      desc: 'Open AI secret API key',
    }),
    API_SECRET_KEY: str({
      desc: 'API secret key',
    }),
    DATABASE_URL: url({
      desc: 'Url to database',
    }),
    ADMIN_EMAIL: str({
      desc: 'Admin email',
    }),
    ADMIN_PASSWORD: str({
      desc: 'Admin password',
    }),
    API_EMAIL: str({
      desc: 'Email from api',
    }),
    SENDGRID_API_KEY: str(),
  });
};

export const {
  NODE_ENV,
  OPENAI_API_KEY,
  API_SECRET_KEY,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  API_EMAIL,
  SENDGRID_API_KEY,
} = getEnvs();
