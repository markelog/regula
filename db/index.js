const { execSync } = require('child_process');

const PSQL = require('fastdev-psql');

const { database } = require('../src/configs');

const psql = new PSQL({
  name: 'maze-storage',
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
  console.log(execSync('npm run db:migrate').toString());
  console.log(execSync('npm run db:seed').toString());

  process.exit(0);
}).catch(error => console.error(error));

psql.pump();
