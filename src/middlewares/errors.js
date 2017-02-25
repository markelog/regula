const configs = require('../configs');

module.exports = () => {
  return async function errors(ctx, next) {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.throw(404);
      }
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        error: {
          message: error.message
        }
      };

      if (configs.logs.enabled) {
        console.error(error);
      }
    }
  };
};
