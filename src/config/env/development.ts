/** Env specific config */
import * as process from 'process';

module.exports = {
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  host: process.env.HOST,
  dbDialect: process.env.DIALECT,
  dbUserEntry: process.env.DB_USER_ENTRY,
  dbPassword: process.env.DB_PASSWORD,
  http: {
    port: process.env.PORT || 3001,
  },
};
