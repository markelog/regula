module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      bossId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Profiles',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: [2, 255]
        }
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: [2, 255]
        }
      },
      about: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        validate: {
          len: [2, 1000]
        }
      },
      contacts: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      social: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: Sequelize.DATE
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'Profiles'
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('Profiles');
  }
};
