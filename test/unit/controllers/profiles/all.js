const Profiles = require('../../../../src/controllers/profiles');
const models = require('../../../../src/models');

describe('Profiles controller', () => {
  let instance;
  let stub;

  beforeEach(() => {
    instance = new Profiles({});
    stub = sinon.stub(models.Profiles, 'findAll', () => 'test');
  });

  afterEach(() => {
    stub.restore();
  });

  describe('all method', () => {
    it('return "hello world"', async () => {
      const result = await instance.all();

      expect(result).to.equal('test');
    });
  });
});
