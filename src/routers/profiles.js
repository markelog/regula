const Router = require('koa-router');

const AppError = require('../modules/AppError');
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

router.delete(
  '/:handle',
  async (ctx) => {
    ctx.body = await ctx.controller.delete(ctx.params.handle);
  }
);

router.post(
  '/',
  async (ctx) => {
    try {
      await ctx.controller.create(ctx.request.body);
      ctx.status = 201;
    } catch (error) {
      ctx.throw(new AppError(400, error.errors));
    }
  }
);

module.exports = router;
