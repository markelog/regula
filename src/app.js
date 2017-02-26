// External modules
const Koa = require('koa');

// Koa dependencies
const bodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');

// Internal dependecies
const config = require('./configs');
const models = require('./models');

// Routers
const profiles = require('./routers/profiles');

// Middlewares
const errors = require('./middlewares/errors');
const logger = require('./middlewares/logger');
const sequelize = require('./middlewares/sequelize');
const respond = require('./middlewares/respond');

// Initialize App
const app = new Koa();

// Define the app
app.use(respond());
app.use(errors());

if (config.logs.enabled) {
  app.use(logger());
}

app.use(sequelize(models.Sequelize));
app.use(favicon(`${__dirname}/favicon.ico`));
app.use(bodyParser());

app.use(profiles.allowedMethods({ throw: true }));
app.use(profiles.routes());

app.listen(config.http.port, () => {
  console.log('Started');
});

module.exports = app;
