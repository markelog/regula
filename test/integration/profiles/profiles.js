const models = require('../../../src/models/index');
const destroy = require('../../helpers/destroy');

describe('/profiles', () => {
  let markelog;
  let viestat;
  let oleg;
  let project;

  const joinedAt = new Date();

  const validateProjectProps = (prj) => {
    expect(prj).to.include.keys([
      'name', 'pm', 'about', 'description',
      'avatar', 'links', 'start',
      'end', 'createdAt', 'updatedAt',
      'profiles'
    ]);

    expect(prj).to.not.include.keys([
      'id', 'deletedAt'
    ]);
  };

  const validateProfileProps = (profile) => {
    expect(profile).to.include.keys([
      'birthday', 'name', 'handle',
      'title', 'about', 'contacts',
      'addresses', 'joinedAt', 'social',
      'avatar', 'createdAt', 'updatedAt',
    ]);

    expect(profile).to.not.include.keys([
      'id', 'deletedAt'
    ]);
  };

  function create(data) {
    delete data.bossId;

    return request(app)
      .post('/profiles')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201);
  }

  beforeEach(() => {
    markelog = {
      id: 1,
      bossId: 2,
      name: 'Oleg Gaidarenko',
      title: 'Kinda cool developer',
      handle: 'markelog',
      about: 'Killa gorilla',
      createdAt: new Date(),
      updatedAt: new Date(),
      joinedAt,
      birthday: '1992-12-12',
    };

    viestat = {
      id: 2,
      bossId: 1,
      name: 'Andrés C. Viesca Ruiz',
      title: 'Taco developer',
      about: 'Sexy turtle',
      handle: 'Viestat',
      createdAt: new Date(),
      updatedAt: new Date(),
      addresses: {
        home: {
          country: 'USA',
          state: 'Texas',
          city: 'Paris'
        },
        current: {
          country: 'The Netherlands',
          province: 'Gelderland',
          city: 'Bronkhorst'
        }
      },
      joinedAt: new Date('2017-05-28'),
      birthday: new Date('1992-05-28'),
    };

    oleg = {
      id: 3,
      bossId: 1,
      name: 'Oleg Koval',
      title: 'Developer',
      about: 'this.about',
      handle: 'ed',
      updatedAt: new Date(),
      birthday: new Date('1989-05-01'),
    };

    project = {
      id: 1,
      pm: 1,
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
    };
  });

  beforeEach(destroy);
  afterEach(destroy);
  afterEach(() => {
    markelog = undefined;
    viestat = undefined;
    oleg = undefined;
    project = undefined;
  });

  beforeEach(async () => {
    const profiles = await models.Profiles.bulkCreate([markelog, viestat, oleg]);
    await models.Projects.bulkCreate([project]);

    profiles.forEach(async (profile) => {
      await profile.setProjects(1);
    });
  });

  describe('GET /profiles', () => {
    describe('all profiles', () => {
      let profiles;

      beforeEach(() => {
        return request(app)
          .get('/profiles')
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            profiles = res.body.data;
          });
      });

      afterEach(() => {
        profiles = undefined;
      });

      it('responded with all profiles', () => {
        const handles = [];

        profiles.forEach((profile) => {
          handles.push(profile.handle);
        });

        expect(handles).to.have.members(['markelog', 'Viestat', 'ed']);
      });

      it('should contain proper properties', () => {
        validateProfileProps(profiles[0]);
        expect(profiles[0]).to.include.keys('boss', 'projects');
      });

      it('respond with all profiles with joinedAt', () => {
        const testMarkelog = profiles.filter(profile => profile.handle === 'markelog')[0];
        const actual = new Date(testMarkelog.joinedAt).getDay();

        expect(actual).to.equal(joinedAt.getDay());
      });

      it('respond with all profiles with addresses for Andres', () => {
        const andres = profiles.filter(profile => profile.handle === 'Viestat')[0];

        expect(andres.addresses).to.deep.equal(viestat.addresses);
      });

      it('respond with all profiles with empty addresses for Oleg', () => {
        const testOleg = profiles.filter(profile => profile.handle === 'ed')[0];

        expect(testOleg.addresses).to.deep.equal({});
      });

      describe('projects', () => {
        let testMarkelog;

        beforeEach(() => {
          [testMarkelog] = profiles.filter(profile => profile.handle === 'markelog');
        });

        afterEach(() => {
          testMarkelog = undefined;
        });

        it('there should be only one project associated with the markelog', () => {
          expect(testMarkelog.projects).to.have.length(1);
          expect(testMarkelog).to.have.deep.property('projects[0].pm.handle', 'markelog');
        });

        it('should be associated with the Maze', () => {
          expect(testMarkelog.projects[0].name).to.equal('Maze');
        });

        it('should contain proper properties', () => {
          validateProjectProps(testMarkelog.projects[0]);
        });

        it('should contain nested profiles', () => {
          const nestedProfiles = testMarkelog.projects[0].profiles;

          expect(nestedProfiles).to.have.length(3);
        });

        it('should proper properties in nested profiles', () => {
          validateProfileProps(testMarkelog.projects[0].profiles[0]);
        });
      });
    });

    it('filter profiles by name', () => {
      return request(app)
        .get('/profiles?q=Andrés')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.data).to.have.length(1);
          expect(res.body.data[0].name).to.equal('Andrés C. Viesca Ruiz');
        });
    });

    it('filter profiles by name case-insensitive', () => {
      return request(app)
        .get('/profiles?q=andrés')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.data).to.have.length(1);
          expect(res.body.data[0].name).to.equal('Andrés C. Viesca Ruiz');
        });
    });

    it('filter profiles by title', () => {
      return request(app)
        .get('/profiles?q=taco')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.data).to.have.length(1);
          expect(res.body.data[0].name).to.equal('Andrés C. Viesca Ruiz');
        });
    });

    it('filter profiles by title case-insensitive', () => {
      return request(app)
        .get('/profiles?q=taCo')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.data).to.have.length(1);
          expect(res.body.data[0].name).to.equal('Andrés C. Viesca Ruiz');
        });
    });
  });

  describe('GET /profiles/:handle', () => {
    let profile;

    describe('specific profile', () => {
      beforeEach(() => {
        return request(app)
          .get('/profiles/markelog')
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            profile = res.body.data;
          });
      });

      afterEach(() => {
        profile = undefined;
      });

      it('responds with proper data', () => {
        expect(profile.handle).to.equal('markelog');
        expect(profile.birthday).to.contain('1992-12-12');
      });

      it('should contain proper properties', () => {
        validateProfileProps(profile);
      });

      it('should contain proper projects properties', () => {
        validateProjectProps(profile.projects[0]);
      });

      describe('specific profile case-insensitive', () => {
        beforeEach(() => {
          return request(app)
            .get('/profiles/MarkelOg')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
              profile = res.body.data;
            });
        });

        afterEach(() => {
          profile = undefined;
        });

        it('responds with proper data', () => {
          expect(profile.handle).to.equal('markelog');
          expect(profile.birthday).to.contain('1992-12-12');
        });

        it('should contain proper properties', () => {
          validateProfileProps(profile);
        });

        it('should contain proper projects properties', () => {
          validateProjectProps(profile.projects[0]);
        });
      });
    });

    it('responds with 404 for non-existent profile', () => {
      return request(app).get('/profiles/non-existent').expect(404);
    });
  });

  describe('DELETE /profiles', () => {
    it('deletes profile', async () => {
      await request(app).delete('/profiles/markelog').expect(204);
      await request(app).get('/profiles/markelog').expect(404);
    });
  });

  describe('POST /profiles', () => {
    beforeEach(destroy);

    it('throws validation error', async () => {
      const { body } = await request(app)
        .post('/profiles')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400);

      expect(body).to.have.deep.property('message', 'Validation Error');
    });

    it('throws validation error for incorrect type of the projects', async () => {
      delete markelog.bossId;
      markelog.projects = ['test'];

      const { body } = await request(app)
        .post('/profiles')
        .send(markelog)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(body).to.have.deep.property('message', 'Incorrect projects reference');
    });
  });

  describe('PUT /profiles/:handle', () => {
    it('updates profile', async () => {
      markelog.name = 'test';

      await request(app)
        .put('/profiles/markelog')
        .send(markelog)
        .expect(204);

      const res = await request(app)
        .get('/profiles/markelog')
        .expect(200);

      expect(res).to.have.deep.property('body.data.name', 'test');
    });

    it('updates project association', async () => {
      markelog.projects = [];

      await request(app)
        .put('/profiles/markelog')
        .send(markelog)
        .expect(204);

      await request(app)
        .get('/profiles/markelog')
        .expect(200)
        .then((res) => {
          expect(res).to.not.have.deep.property('body.data.projects[0]');
        });
    });

    describe('creates profile', () => {
      beforeEach(() => {
        return models.Profiles.destroy({
          force: true,
          where: {}
        });
      });

      it('just creates a profiles', async () => {
        await create(viestat);
        await create(markelog);

        return request(app).get('/profiles/markelog').expect(200);
      });

      it('creates profile if it doesn\'t exist', async () => {
        delete markelog.id;
        markelog.handle = 'test';
        await create(viestat);

        await request(app)
          .put('/profiles/test')
          .send(markelog)
          .expect('Content-Type', /json/)
          .expect(201);

        const { body } = await request(app)
          .get('/profiles/test')
          .expect(200);

        expect(body).to.have.deep.property('data.handle', 'test');
      });

      it("creates profile if it doesn't exist and associates it with project", async () => {
        markelog.handle = 'test';
        markelog.projects = [1];
        await create(viestat);

        await request(app)
          .put('/profiles/test')
          .send(markelog)
          .expect('Content-Type', /json/)
          .expect(201);

        const { body } = await request(app)
          .get('/profiles/test')
          .expect(200);

        expect(body).to.have.deep.property('data.projects[0].name', 'Maze');
      });

      it('throws validation error', async () => {
        markelog.name = 't';
        await create(viestat);

        const response = await request(app)
          .put('/profiles/markelog')
          .send(markelog)
          .expect('content-type', /json/)
          .expect(400);

        expect(response.body.type).to.equal('error');
        expect(response.body.message).to.equal(
          'Validation error: Name should be longer then 2 symbols'
        );
        expect(response.body.data).is.not.empty;
      });
    });
  });
});
