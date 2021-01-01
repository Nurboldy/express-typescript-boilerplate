import { SequelizeAuto } from 'sequelize-auto';
export const auto = new SequelizeAuto('dev', 'postgres', 'changeme', {
  host: 'localhost',
  dialect: 'postgres',
  directory: './models', // where to write files
  port: 5432,
  caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
  caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
  additional: {
    timestamps: false,
  },
  tables: ['public.user', 'public.user_login_attempt', 'public.user_password'], // use all tables, if omitted
});
