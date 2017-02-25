const models = require('../../../src/models/index');
const destroy = require('../../helpers/destroy');

describe('/profiles', () => {
  beforeEach(destroy);
  afterEach(destroy);

  beforeEach(async () => {
    await models.Profiles.bulkCreate([{
      id: 1,
      bossId: 2,
      name: 'Oleg Gaidarenko',
      title: 'Kinda cool developer',
      handle: 'markelog',
      about: 'Killa gorilla',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      bossId: 1,
      name: 'Andrés C. Viesca Ruiz',
      title: 'Taco developer',
      about: 'Sexy turtle',
      handle: 'Viestat',
      contacts: JSON.stringify({}),
      social: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
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

    it('responds with 404 for non-existent profile', () => {
      return request(app).get('/profiles/non-existent').expect(404);
    });
  });

  describe('DELETE /profiles', () => {
    it('deletes profile', async () => {
      await request(app).delete('/profiles/markelog').expect(200);
      await request(app).get('/profiles/markelog').expect(404);
    });
  });
});
