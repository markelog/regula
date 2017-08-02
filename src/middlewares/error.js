const Sequelize = require('sequelize');

const { http } = require('../configs');

function set5xx(body, error) {
  if (http.exposeErrors) {
    body.message = error.message;
    body.data = error.stack;

  } else {
    // Do not expose 500 error messages
    body.message = 'Something went wrong';

    // Do not expose additional info for specific environments
    body.data = {};
  }
}

function set4xx(body, error) {
  body.message = error.message;

  if (error instanceof Sequelize.ValidationError) {
    body.data = error.errors;
  } else {
    body.data = {};
  }
}

module.exports = () => {
  return async function make(ctx, next) {
    ctx.error = function out(status, error) {
      const body = {
        type: 'error',
      };

      this.type = 'application/json';
      this.status = status;

      if (status >= 500) {
        set5xx(body, error);

      } else if (status >= 400) {
        set4xx(body, error);
      }

      this.body = body;
    };

    await next();
  };
};
