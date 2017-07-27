module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Profiles', [{
      id: 1,
      bossId: 2,
      name: 'Oleg Gaidarenko',
      title: 'Kinda cool developer',
      handle: 'markelog',
      about: 'Killa gorilla',
      createdAt: new Date(),
      updatedAt: new Date(),
      joinedAt: new Date(),
      birthday: new Date('1992-03-08'),
      avatar: 'https://avatars3.githubusercontent.com/u/945528?v=3&s=400',
      contacts: JSON.stringify({
        phones: {
          home: '+7 (965) 265-14-72'
        },

        emails: {
          work: 'markelog@wearereasonablepeople.com'
        },

        slack: {
          handle: 'markelog'
        },

        github: {
          handle: 'markelog'
        }
      }),
      addresses: JSON.stringify({
        home: {
          country: 'USA',
          state: 'Texas',
          city: 'Paris'
        },
        current: {
          country: 'Netherlands',
          city: 'Rotterdam'
        }
      })
    }, {
      id: 2,
      bossId: 1,
      name: 'Andrés C. Viesca Ruiz',
      title: 'Taco developer',
      about: 'Sexy turtle',
      handle: 'Viestat',
      createdAt: new Date(),
      updatedAt: new Date(),
      joinedAt: new Date(),
      avatar: 'https://avatars0.githubusercontent.com/u/9158996?v=3&s=400',
      addresses: JSON.stringify({
        current: {
          country: 'Netherlands',
          city: 'Rotterdam',
          street: 'bergpolderstraat 49',
        }
      }),
      contacts: JSON.stringify({
        slack: {
          handle: 'andres'
        },

        github: {
          handle: 'viestat'
        }
      }),
      birthday: new Date('1992-05-28'),
    }]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Profiles', {
      id: { $in: [1, 2] }
    });
  }
};
