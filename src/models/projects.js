module.exports = (storage, Sequelize) => {
  const Projects = storage.define('Projects', {
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
    about: {
      type: Sequelize.STRING(1000),
      validate: {
        len: [2, 1000]
      }
    },
    description: {
      type: Sequelize.STRING,
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
    end: Sequelize.DATE
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'Projects'
  });

  Projects.associate = (models) => {
    models.Projects.belongsToMany(models.Profiles, {
      through: 'ProfileProject',
      foreignKey: 'profileId',
      as: 'profiles'
    });

    models.Projects.hasOne(models.Profiles, {
      foreignKey: 'id',
      targetKey: 'pm',
      as: 'pm'
    });
  };

  return Projects;
};
