const Router = require('koa-router');

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
    ctx.out(200, result, 'There you go');
  }
);

router.post(
  '/',
  async (ctx) => {
    const profile = await ctx.controller.create(ctx.request.body);

    ctx.out(201, profile, 'Profile was created');
  }
);

router.get(
  '/:handle',
  async (ctx) => {
    const result = await ctx.controller.get(ctx.params.handle);

    if (result == null) {
      ctx.out(404);
      return;
    }

    ctx.out(200, result, 'There you go');
  }
);

router.delete(
  '/:handle',
  async (ctx) => {
    await ctx.controller.delete(ctx.params.handle);

    ctx.out(204, 'Profile was removed');
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
        ctx.out(201, {}, 'Profile was created');

      } else if (type === 'updated') {
        ctx.out(204, {}, 'Profile was updated');
      }
    } catch (error) {
      ctx.error(400, error);
    }
  }
);

module.exports = router;
