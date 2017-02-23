// External modules
const Koa = require('koa');

// Koa dependencies
const bodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');

// Internal dependecies
const config = require('./configs');

// Routers
const hello = require('./routers/hello');

// Middlewares
const errors = require('./middlewares/errors');
const logger = require('./middlewares/logger');

// Initialize App
const app = new Koa();

// Define the app
if (config.shouldLog) {
  app.use(logger());
}

app.use(errors());
app.use(favicon(`${__dirname}/favicon.ico`));
app.use(bodyParser());

app.use(hello.allowedMethods({ throw: true }));
app.use(hello.routes());

app.listen(config.http.port, () => {
  console.log('Started');
});

module.exports = app;
