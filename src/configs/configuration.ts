import * as dotenv from 'dotenv';
dotenv.config();
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
  },
  MULTER_DEST: process.env.MULTER_DEST,
});
