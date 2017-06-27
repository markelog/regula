const models = require('../models');

const attributes = {
  exclude: [
    'id',
    'bossId',
    'deletedAt',
  ]
};

const include = [{
  required: true,
  model: models.Profiles,
  as: 'boss',
  attributes: ['name', 'handle']
}, {
  required: false,
  model: models.Projects,
  as: 'projects',
  through: {
    attributes: []
  },
  attributes: {
    exclude: ['id', 'deletedAt']
  },
  include: [{
    required: false,
    model: models.Profiles,
    as: 'profiles',
    through: {
      attributes: []
    },
    attributes,
    where: {
      deletedAt: null
    }
  }, {
    required: false,
    model: models.Profiles,
    as: 'pm',
    attributes,
    where: {
      deletedAt: null
    }
  }],
}];

/**
 * Controller for the "/profiles" paths
 */
module.exports = class Profile {
  /**
   * Specify request context
   * @param {Object} context
   */
  constructor(context) {
    this.context = context;
  }

  /**
   * Get all profiles
   * @param {Object} [query] - query search on `title` and `name`
   * @return {Promise}
   */
  async all(query) {
    let where = {};

    if (query != null) {
      const $or = [{
        name: {
          $ilike: `%${query}%`
        }
      }, {
        title: {
          $ilike: `%${query}%`
        }
      }];

      where = { $or };
    }

    const profiles = await models.Profiles.findAll({
      attributes, where, include
    });

    return profiles;
  }

  /**
   * Get specific profile
   * @param {string} handle
   * @return {Promise}
   */
  async get(handle) {
    const where = {
      handle: {
        $ilike: handle
      },
      deletedAt: null };

    return models.Profiles.findOne({
      attributes, where, include
    });
  }

  /**
   * Delete specific profile
   * @param {string} handle
   * @return {Boolean} - whenever or not action was performed
   */
  async delete(handle) {
    const where = { handle, deletedAt: null };

    await models.Profiles.destroy({
      where
    });

    return true;
  }

  /**
   * Create profile
   * @param {Object} data - profile data
   * @return {Boolean} - whenever or not action was performed
   */
  async create(data) {
    const { projects } = data;
    delete data.projects;

    const transaction = await models.sequelize.transaction();

    try {
      const profile = await models.Profiles.create(data, {
        transaction
      });

      await this.setProjects(profile, projects, transaction);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    return true;
  }

  /**
   * Set profile projects
   * Moved to special function to properly handle errors
   * @param {Object} profile
   * @param {Array} projects
   * @param {Object} transaction
   */
  async setProjects(profile, projects, transaction) {
    if (projects === undefined) {
      return;
    }

    try {
      await profile.setProjects(projects, { transaction });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Either updates or creates profile
   * @param {string} handle
   * @param {object} data - new profile data
   * @return {string} response type - "created" | "updated"
   */
  async update(handle, data) {
    const transaction = await models.sequelize.transaction();

    try {
      // So method wouldn't became destructive
      data = Object.assign({}, data);

      // Handle needs to be present for create request
      data.handle = handle;

      // Extract "projects" property since it doesn't
      // have to be included in update request
      const { projects } = data;
      delete data.projects;

      const [profile, created] = await models.Profiles.findOrCreate({
        where: { handle },
        defaults: data,
        transaction
      });

      if (projects !== undefined) {
        await profile.setProjects(projects, { transaction });
      }

      // If there is no profile - create one,
      // that's what concepts of REST tell us
      if (created) {
        await transaction.commit();
        return 'created';
      }

      // We can't allow `handle` to be updated
      // since its used all over the place.
      delete data.handle;
      await profile.update(data, { transaction });

      await transaction.commit();
      return 'updated';

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
