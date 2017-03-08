const Router = require('koa-router');

const router = new Router();

router.get(
  '/favicon.ico',
  async (ctx) => {
    ctx.respond(204);
  }
);

module.exports = router;

