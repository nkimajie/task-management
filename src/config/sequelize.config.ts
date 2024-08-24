// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  timezone: '+01:00',
  dialectOptions: {
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },
  autoLoadModels: true,
  synchronize: false,
  logging: true,
};
