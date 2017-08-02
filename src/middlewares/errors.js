const Sequelize = require('sequelize');

module.exports = (configs) => {
  return async function errors(ctx, next) {
    try {
      await next();
    } catch (error) {
      let status = error.status || 500;

      if (error instanceof Sequelize.ValidationError) {
        status = 400;
      }

      ctx.error(status, error);

      if (configs.logs.enabled) {
        console.error(error);
      }
    }
  };
};
