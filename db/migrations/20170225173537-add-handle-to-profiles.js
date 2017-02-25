module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Profiles',
      'handle',
      {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 255]
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.removeColumn(
      'Profiles',
      'handle'
    );
  }
};
