import { Configuration } from 'src/types/configuration';
import { config } from 'dotenv';
config();

export const BasicConfig: Configuration = {
  environment: process.env.environment
    ? process.env.environment
    : 'no-config-loaded',
  database_host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : '',
  database_port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT)
    : 0,
  database_username: process.env.POSTGRES_USER ? process.env.POSTGRES_USER : '',
  database_password: process.env.POSTGRES_PASSWORD
    ? process.env.POSTGRES_PASSWORD
    : '',
  database_name: process.env.POSTGRES_DB ? process.env.POSTGRES_DB : '',
};

export const basicConfigFactory = () => BasicConfig;
