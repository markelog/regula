const Sequelize = require('sequelize');

const app = require('../../../src/app');
const errors = require('../../../src/middlewares/errors');

describe('App', () => {

  describe('main logic', () => {
    it('should enable the logs in the app', () => {
      const start = app({
        logs: {
          enabled: true
        },
        http: {
          port: 8080
        }
      });

      expect(start.context).to.have.property('logger');
      expect(start.context.logger).to.be.a('function');
    });
  });

  describe('errror middleware', () => {
    let cns;

    beforeEach(() => {
      cns = sinon.stub(console, 'error');
    });

    afterEach(() => {
      cns.restore();
    });

    it('should enable logs in the middleware handler', () => {
      const start = errors({
        logs: {
          enabled: true
        }
      });

      const ctx = { error: sinon.stub() };
      const error = new Error('test');
      const next = sinon.stub().throws(error);

      start(ctx, next);

      expect(console.error).to.be.calledWith(error);
    });

    it('should not enable logs in the middleware handler', () => {
      const start = errors({
        logs: {
          enabled: false
        }
      });

      const ctx = { error: sinon.stub() };
      const error = new Error('test');
      const next = sinon.stub().throws(error);

      start(ctx, next);

      expect(console.error).to.not.be.called;
    });

    it('should set "500" error if status is not set', () => {
      const start = errors({
        logs: {
          enabled: true
        }
      });

      const ctx = { error: sinon.stub() };
      const error = new Error('test');
      const next = sinon.stub().throws(error);

      start(ctx, next);

      expect(ctx.error.getCall(0).args[0]).to.equal(500);
    });

    it('should set error status', () => {
      const start = errors({
        logs: {
          enabled: true
        }
      });

      const ctx = { error: sinon.stub() };
      const error = new Error('test');
      error.status = 403;
      const next = sinon.stub().throws(error);

      start(ctx, next);

      expect(ctx.error.getCall(0).args[0]).to.equal(403);
    });

    it('should set error status for the Sequelize.ValidationError', () => {
      const start = errors({
        logs: {
          enabled: true
        }
      });

      const ctx = { error: sinon.stub() };
      const error = new Sequelize.ValidationError('test');
      const next = sinon.stub().throws(error);

      start(ctx, next);

      expect(ctx.error.getCall(0).args[0]).to.equal(400);
    });
  });
});
