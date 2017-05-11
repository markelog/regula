module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Profiles',
      'avatar',
      {
        type: Sequelize.TEXT,
        allowNull: true
      }
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn(
      'Profiles',
      'avatar'
    );
  }
};
