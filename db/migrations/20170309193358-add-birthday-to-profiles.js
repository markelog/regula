module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Profiles',
      'birthday',
      {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn(
      'Profiles',
      'birthday'
    );
  }
};
