import { config } from 'dotenv';
config();

import { DataSource } from 'typeorm';
import { User } from './commom/database/entities';

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
});
