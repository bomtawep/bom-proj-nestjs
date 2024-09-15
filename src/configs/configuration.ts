import * as dotenv from 'dotenv';
dotenv.config();

switch (process.env.APP_MODE) {
  case 'development':
    dotenv.config({ path: '.env.development' });
    break;
  case 'test':
    dotenv.config({ path: '.env.test' });
    break;
  case 'production':
    dotenv.config({ path: '.env.production' });
    break;
  default:
    dotenv.config({ path: '.env.development' });
    break;
}

export default () => ({
  port: process.env.PORT || 3000,
  API_PREFIX: process.env.API_PREFIX,
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_POST ? +process.env.DATABASE_POST : 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE !== 'false',
  }
});