const configs = require('../configs');

module.exports = () => {
  return async function errors(ctx, next) {
    try {
      await next();
    } catch (error) {
      ctx.status = error.status || 500;

      ctx.body = {
        message: error.message,
        data: error.data || {}
      };

      if (configs.logs.enabled) {
        console.error(error);
      }
    }
  };
};
