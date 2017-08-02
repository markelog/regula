const moment = require('moment');

module.exports = (storage, Sequelize) => {
  const Profiles = storage.define('Profiles', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    bossId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Name should be longer then 2 symbols'
        }
      }
    },
    handle: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Handle should be longer then 2 symbols'
        }
      }
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Title should be longer then 2 symbols'
        }
      }
    },
    about: {
      type: Sequelize.STRING(1000),
      allowNull: false,
      validate: {
        len: {
          args: [1, 1000],
          msg: 'Too long about'
        }
      }
    },
    contacts: {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    addresses: {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    joinedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    social: {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {}
    },
    avatar: {
      type: Sequelize.TEXT
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      get() {
        return moment(this.getDataValue('birthday')).format('YYYY-MM-DD');
      }
    },
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'Profiles'
  });

  Profiles.associate = (models) => {
    models.Profiles.belongsTo(models.Profiles, {
      foreignKey: 'bossId',
      as: 'boss'
    });

    models.Profiles.hasMany(models.Profiles, {
      foreignKey: 'id',
      as: 'subordinates'
    });

    models.Profiles.belongsToMany(models.Projects, {
      through: 'ProfileProject',
      foreignKey: 'projectId',
      as: 'projects'
    });
  };

  return Profiles;
};
