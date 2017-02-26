module.exports = () => {
  return async function makeRespond(ctx, next) {
    ctx.respond = function respond(status, data, message) {
      message = message || '';
      let type = 'success';

      this.type = 'application/json';
      this.status = status;

      if (this.status === 204) {
        return;
      }

      if (status >= 400) {
        type = 'error';
      }

      this.body = {
        type, message, data
      };
    };

    await next();
  };
};
