const { execSync } = require('child_process');

const sequelize = `${__dirname}/../node_modules/.bin/sequelize`;

console.log(execSync(`${sequelize} db:migrate`).toString());

