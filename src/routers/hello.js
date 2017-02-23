const Router = require('koa-router');

const Hello = require('../controllers/hello');

const router = new Router({ prefix: '/hello' });

router.use(async (context, next) => {
  context.controller = new Hello(context);
  await next();
});

router.get(
  '/',
  async (ctx) => {
    ctx.body = 'test';
  }
);

router.get(
  '/:name',
  async (ctx) => {
    ctx.body = ctx.controller.hello(ctx.params.name);
  }
);

module.exports = router;
