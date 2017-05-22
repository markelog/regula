module.exports = (configs) => {
  return async function errors(ctx, next) {
    try {
      await next();
    } catch (error) {
      const status = error.status || 500;

      ctx.respond(status, error.data, error.message);

      if (configs.logs.enabled) {
        console.error(error);
      }
    }
  };
};
