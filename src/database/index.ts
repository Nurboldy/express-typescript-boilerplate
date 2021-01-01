import Sequelize from 'sequelize';
import { logger } from '../utils/logger';
import UserModel from '../models/user.model';
import PasswordModel from '../models/password.model';

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize.Sequelize(
  <string>process.env.DB_DATABASE,
  <string>process.env.DB_USERNAME,
  <string>process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    timezone: '+09:00',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      underscored: true,
      freezeTableName: true,
    },
    logQueryParameters: env === 'development',
    logging: (query, time) => {
      logger.info(time + 'ms' + ' ' + query);
    },
    benchmark: true,
  },
);

sequelize
  .authenticate()
  .then(() => {
    logger.info('🟢 The database is connected.');
  })
  .catch((error: Error) => {
    logger.error(`🔴 Unable to connect to the database: ${error}.`);
  });

const DB = {
  Users: UserModel(sequelize),
  Passwords: PasswordModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
