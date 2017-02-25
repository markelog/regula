const models = require('../../../src/models/index');
const destroy = require('../../helpers/destroy');

describe('/profiles', () => {
  const markelog = {
    id: 1,
    bossId: 2,
    name: 'Oleg Gaidarenko',
    title: 'Kinda cool developer',
    handle: 'markelog',
    about: 'Killa gorilla',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const viestat = {
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
  };

  beforeEach(destroy);
  afterEach(destroy);

  beforeEach(async () => {
    await models.Profiles.bulkCreate([markelog, viestat]);
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

  describe('POST /profiles', () => {
    beforeEach(destroy);

    it('creates profile', async () => {
      await request(app)
        .post('/profiles')
        .send(markelog)
        .expect(201);

      return request(app).get('/profiles/markelog').expect(200);
    });

    it('throws validation error', async () => {
      const response = await request(app)
        .post('/profiles')
        .send({})
        .expect(400);

      const firstMessage = response.body.data[0].message;

      expect(firstMessage).to.equal('bossId cannot be null');
    });
  });
});
