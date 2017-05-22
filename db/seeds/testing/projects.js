module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Projects', [{
      name: 'Maze',
      about: 'Intranet social network with focus on business side of employees communication',
      description: 'Don\'t get lost',
      avatar: 'http://www.mazegenerator.net/static/theta_maze_with_20_cells_diameter.png',
      links: JSON.stringify([{
        type: 'github',
        name: 'front',
        link: 'https://github.com/wearereasonablepeople/maze'
      }, {
        type: 'github',
        name: 'api',
        link: 'https://github.com/wearereasonablepeople/maze-api'
      }]),
      start: new Date('May 17, 2017'),
      end: new Date('December 17, 2017'),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Projects', {
      name: 'Maze'
    });
  }
};
