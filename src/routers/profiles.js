const Router = require('koa-router');

const Hello = require('../controllers/profiles');

const router = new Router({ prefix: '/profiles' });

router.use(async (context, next) => {
  context.controller = new Hello(context);
  await next();
});

router.get(
  '/',
  async (ctx) => {
    ctx.body = await ctx.controller.all();
  }
);

router.get(
  '/:handle',
  async (ctx) => {
    const result = await ctx.controller.get(ctx.params.handle);

    if (result == null) {
      ctx.throw(404);
    }

    ctx.body = result;
  }
);

module.exports = router;
