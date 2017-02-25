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
    ctx.body = await ctx.controller.get(ctx.params.handle);
  }
);

module.exports = router;
