module.exports = () => {
  return async function make(ctx, next) {
    ctx.out = function out(status, data = {}, message = '') {
      const type = 'success';

      this.type = 'application/json';
      this.status = status;

      if (this.status === 204) {
        return;
      }

      this.body = {
        type, message, data
      };
    };

    await next();
  };
};
