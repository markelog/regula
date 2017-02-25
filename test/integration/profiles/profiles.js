const models = require('../../../src/models/index');
const destroy = require('../../helpers/destroy');

describe('/profiles', () => {
  beforeEach(destroy);
  afterEach(destroy);

  beforeEach(async () => {
    await models.Profiles.create({
      bossId: 2,
      name: 'Oleg Gaidarenko',
      title: 'Kinda cool developer',
      handle: 'markelog',
      about: 'Killa gorilla'
    });
  });

  describe('GET /profiles', () => {
    it('respond with all profiles', () => {
      return request(app)
        .get('/profiles')
        .expect(200)
        .then((data) => {
          expect(data.body[0].about).to.equal('Killa gorilla');
        });
    });
  });

  describe('GET /profiles/:handle', () => {
    it('respond with all profiles', () => {
      return request(app)
        .get('/profiles/markelog')
        .expect(200)
        .then((data) => {
          expect(data.body.handle).to.equal('markelog');
        });
    });
  });
});
