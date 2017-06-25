module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('ProfileProject', [{
      profileId: 1,
      projectId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      profileId: 2,
      projectId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      profileId: 1,
      projectId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      profileId: 2,
      projectId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('ProfileProject', {
      projectId: { $in: [1, 2] }
    });
  }
};
