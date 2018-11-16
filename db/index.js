const PSQL = require('fastdev-psql');

const { database } = require('../src/configs');

const psql = new PSQL({
  name: 'regula-storage',
  user: database.username,
  password: database.password,
  db: database.database,
  port: database.options.port
});

// Doesn't look doable in CI
if (!process.env.TRAVIS) {
  psql.log();
}

psql.up().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});

psql.pump();
