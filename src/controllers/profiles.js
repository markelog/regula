const models = require('../models');

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
   * @return {Object}
   */
  async all() {
    const all = await models.Profiles.findAll();

    return all;
  }
};
