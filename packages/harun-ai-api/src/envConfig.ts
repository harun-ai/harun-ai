import { cleanEnv, str } from 'envalid';
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
  });
};

export const { NODE_ENV, OPENAI_API_KEY } = getEnvs();
