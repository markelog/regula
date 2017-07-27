module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('ProfileProject', {
      profileId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      projectId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('ProfileProject');
  }
};
