// External modules
const Koa = require('koa');

// Koa dependencies
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');

// Internal dependecies
const config = require('./configs');

// Routers
const favicon = require('./routers/favicon');
const profiles = require('./routers/profiles');

// Middlewares
const errors = require('./middlewares/errors');
const logger = require('./middlewares/logger');
const respond = require('./middlewares/respond');

// Initialize App
const app = new Koa();

// Define the app
app.use(respond());
app.use(errors());

app.use(favicon.routes());

if (config.logs.enabled) {
  app.use(logger());
}

app.use(cors());
app.use(bodyParser());

app.use(profiles.allowedMethods({ throw: true }));
app.use(profiles.routes());

app.listen(config.http.port, () => {
  console.log('Started');
});

module.exports = app;
