// External modules
const Koa = require('koa');

// Koa dependencies
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');

// Routers
const favicon = require('./routers/favicon');
const profiles = require('./routers/profiles');

// Middlewares
const errors = require('./middlewares/errors');
const logger = require('./middlewares/logger');
const respond = require('./middlewares/respond');

module.exports = (configs) => {
  // Initialize App
  const app = new Koa();

  // Define the app
  app.use(respond());
  app.use(errors(configs));

  app.use(favicon.routes());

  if (configs.logs.enabled) {
    app.context.logger = logger();
    app.use(app.context.logger);
  }

  app.use(cors());
  app.use(bodyParser());

  app.use(profiles.allowedMethods({ throw: true }));
  app.use(profiles.routes());

  app.listen(configs.http.port, () => {
    if (configs.logs.enabled) {
      console.log('Started');
    }
  });

  return app;
};
