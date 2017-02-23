const models = require('../../../src/models/index');
const destroy = require('../../helpers/destroy');

describe('GET /profiles', () => {
  beforeEach(destroy);
  afterEach(destroy);

  beforeEach(async () => {
    await models.Profiles.create({
      bossId: 2,
      name: 'Oleg Gaidarenko',
      title: 'Kinda cool developer',
      about: 'Killa gorilla'
    });
  });

  it('respond with all profiles', () => {
    return request(app)
      .get('/profiles')
      .expect(200)
      .then((data) => {
        expect(data.body[0].about).to.equal('Killa gorilla');
      });
  });
});
