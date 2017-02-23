// Have to do it this way, cause of the sequelize-cli issue -
// https://github.com/sequelize/cli/issues/36
const config = require('.').database;

module.exports = {
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.options.host,
  dialect: config.options.dialect,
  port: config.options.port,
  logging: config.options.logging,
  dialectOptions: config.options.dialectOptions
};
