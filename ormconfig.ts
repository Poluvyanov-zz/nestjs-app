import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import {
  DB_CONNECTION_WITH_NO_SSL,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from './src/app.constants';

dotenv.config({ path: '.env' });
const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST || '192.168.99.103',
  port: DB_PORT || 5432,
  username: DB_USERNAME || 'postgres',
  password: DB_PASSWORD || '',
  database: DB_DATABASE || '',
  entities: [__dirname + '/src/modules/**/**/**.entity{.ts,.js}'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: 'migrations',
  ssl: DB_CONNECTION_WITH_NO_SSL,
  migrationsRun: false,
  logging: false,
  logger: 'advanced-console',
  migrations: [__dirname + '/database/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: '/database/migration',
  },
};
export = connectionOptions;
