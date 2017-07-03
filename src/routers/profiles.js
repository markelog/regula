const Router = require('koa-router');

const AppError = require('../modules/AppError');
const Profiles = require('../controllers/profiles');

const router = new Router({ prefix: '/profiles' });

router.use(async (context, next) => {
  context.controller = new Profiles(context);

  await next();
});

router.get(
  '/',
  async (ctx) => {
    const result = await ctx.controller.all(ctx.query.q);

    ctx.respond(200, result);
  }
);

router.post(
  '/',
  async (ctx) => {
    try {
      await ctx.controller.create(ctx.request.body);
      ctx.respond(201);
    } catch (error) {
      ctx.throw(new AppError(400, error.errors || error.message, 'Can\'t create a user'));
    }
  }
);

router.get(
  '/:handle',
  async (ctx) => {
    const result = await ctx.controller.get(ctx.params.handle);

    if (result == null) {
      ctx.throw(404);
    }

    ctx.respond(200, result);
  }
);

router.delete(
  '/:handle',
  async (ctx) => {
    await ctx.controller.delete(ctx.params.handle);

    ctx.respond(204, {}, 'deleted');
  }
);

router.put(
  '/:handle',
  async (ctx) => {
    try {
      const type = await ctx.controller.update(
        ctx.params.handle,
        ctx.request.body
      );

      if (type === 'created') {
        ctx.respond(201);
      } else if (type === 'updated') {
        ctx.respond(204, {}, 'updated');
      }
    } catch (error) {
      ctx.throw(new AppError(400, error.errors));
    }
  }
);

module.exports = router;
