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
   * @return {Promise}
   */
  async all() {
    return models.Profiles.findAll();
  }

  /**
   * Get specific profile
   * @param {string} handle
   * @return {Promise}
   */
  async get(handle) {
    return models.Profiles.findOne({
      where: {
        handle
      }
    });
  }

  /**
   * Delete specific profile
   * @param {string} handle
   * @return {Boolean} - whenever or not action was performed
   */
  async delete(handle) {
    await models.Profiles.destroy({
      where: {
        handle
      }
    });

    return true;
  }

  /**
   * Create profile
   * @param {Object} data - profile data
   * @return {Boolean} - whenever or not action was performed
   */
  async create(data) {
    await models.Profiles.create(data);

    return true;
  }

  /**
   * Update the specific profile
   * @param {string} handle
   * @param {object} data - new profile data
   * @return {string} response type - "created" | "updated"
   */
  async update(handle, data) {
    // So method wouldn't became destructive
    data = Object.assign({}, data);

    const profile = await this.get(handle);

    // If there is no profile - create one,
    // that's what concepts of REST tell us
    if (profile == null) {
      // Handle needs to be present for create request
      data.handle = handle;

      await this.create(data);
      return 'created';
    }

    // We can't allow `handle` to be updated
    // since its used all over the place.
    delete data.handle;

    // Check if record exists in db
    await profile.update(data);
    return 'updated';
  }
};
