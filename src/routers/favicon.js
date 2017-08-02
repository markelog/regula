const Router = require('koa-router');

const router = new Router();

router.get(
  '/favicon.ico',
  async (ctx) => {
    ctx.out(204);
  }
);

module.exports = router;
