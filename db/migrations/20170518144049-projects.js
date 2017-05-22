module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Projects', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 255]
        }
      },
      pm: Sequelize.INTEGER,
      about: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        validate: {
          len: [2, 1000]
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 255]
        }
      },
      avatar: {
        type: Sequelize.TEXT
      },
      links: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      start: Sequelize.DATE,
      end: Sequelize.DATE,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: Sequelize.DATE
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('Projects');
  }
};
