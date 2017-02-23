const models = require('../../src/models');

module.exports = async function destroy() {
  await models.Profiles.destroy({
    force: true,
    where: {}
  });
};
