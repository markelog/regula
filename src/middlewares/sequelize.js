module.exports = (Sequelize) => {
  return async function sequelize(ctx, next) {
    try {
      await next();
    } catch (error) {
      if (!(error instanceof Sequelize.Error)) {
        throw error;
      }

      if (error.name === 'SequelizeValidationError') {
        const details = [];

        for (let i = 0; i < error.errors.length; ++i) {
          details.push({
            field: error.errors[i].path,
            message: error.errors[i].message
          });
        }

        this.body = {
          error: {
            message: 'Validation errors',
            details
          }
        };
        this.status = 422;
        return;
      }

      if (
        error.name === 'SequelizeUniqueConstraintError' ||
        error.name === 'SequelizeForeignKeyConstraintError' ||
        error.name === 'SequelizeExclusionConstraintError'
      ) {
        this.status = 409;
        this.body = {
          error: {
            message: error.message
          }
        };
        return;
      }

      throw error;
    }
  };
};
