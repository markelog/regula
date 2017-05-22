module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('ProfileProject', [{
      profileId: 1,
      projectId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('ProfileProject', {
      profileId: 1,
      projectId: 1
    });
  }
};
