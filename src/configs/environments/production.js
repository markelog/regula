const config = require('./default');

config.setup.executeSeeds = false;

const psql = parse(process.env.DATABASE_URL);

config.database = {
  username: psql.user,
  password: psql.password,
  database: psql.database,
  dialect: psql.driver,
  options: {
    host: psql.host,
    port: psql.port,
    dialect: psql.driver,
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
      ssl: true
    }
  }
};

module.exports = config;
