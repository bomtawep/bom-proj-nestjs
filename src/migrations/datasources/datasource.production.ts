import { DataSource, DataSourceOptions } from 'typeorm';
import { entities }  from '~/entities';
import appConfig from '~/configs/configuration';
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.production' });

const ds = new DataSource({
  ...appConfig().database,
  entities: entities,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
} as DataSourceOptions);

export default ds;