module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Projects', [{
      id: 1,
      name: 'regula',
      about: 'Intranet social network with focus on business side of employees communication',
      description: 'Don\'t get lost',
      avatar: 'http://www.regulagenerator.net/static/theta_regula_with_20_cells_diameter.png',
      links: JSON.stringify([{
        type: 'github',
        name: 'front',
        link: 'https://github.com/markelog/regula'
      }, {
        type: 'github',
        name: 'api',
        link: 'https://github.com/markelog/regula-api'
      }]),
      start: new Date('May 17, 2017'),
      end: new Date('December 17, 2017'),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'Ing Living',
      about: 'Apartments, experts and mortgages',
      description: 'Ing living provides information on apartments with help of experts and communication with the friends',
      avatar: 'http://www.regulagenerator.net/static/theta_regula_with_20_cells_diameter.png',
      links: JSON.stringify([{
        type: 'github',
        name: 'portals',
        link: 'https://github.com/markelog/ing-living-web-portal'
      }, {
        type: 'github',
        name: 'server',
        link: 'https://github.com/markelog/ing-living-server'
      }, {
        type: 'github',
        name: 'app',
        link: 'https://github.com/markelog/ing-living-app'
      }]),
      start: new Date('May 17, 2017'),
      end: new Date('December 17, 2017'),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Projects', {
      id: { $in: [1, 2] }
    });
  }
};
