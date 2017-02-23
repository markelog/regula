const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const supertest = require('supertest-as-promised');
const agent = require('supertest-koa-agent');

chai.use(sinonChai);

process.env.NODE_ENV = 'testing';
global.expect = chai.expect;
global.sinon = sinon;
global.request = supertest;

// Can't use an `const  statement =,require(it will initialize ap)p
global.app = agent(require('../../src/app')).app;
