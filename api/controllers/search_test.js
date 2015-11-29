// Testing the search controller
const Lab = require('lab');
const Code = require('code');
const Sinon = require('sinon');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const after = lab.after;
const before = lab.before;

// Fixture data
const data = require('../services/lyricsnmusic_fixtures.js').data;

describe('Search Controller', () => {
  let Hapi;
  let Request;
  let SearchController; // eslint-disable-line no-unused-vars
  let routes;
  let server;
  let stubRequest; // eslint-disable-line no-unused-vars

  const response = {
    body: data,
  };

  before(done => {
    // stub the superagent response
    Request = require('superagent');
    stubRequest = Sinon.stub(Request.Request.prototype, 'end', callback => {
      return callback(null, response);
    });
    // create the test Hapi server
    Hapi = require('hapi');
    server = new Hapi.Server();
    SearchController = require('./search.js').search;
    // Only include search route
    routes = require('../config/routes.js').routes.filter(route => {
      return route.path === '/search';
    });
    server.connection();
    server.route(routes);
    done();
  });

  it('GET /search with q query returns LyricsMusicAPI response body', done => {
    const options = {
      method: 'GET',
      url: '/search?q=test',
    };
    server.inject(options, res => {
      expect(res.statusCode).to.equal(200);
      expect(res.result.data).to.have.length(response.body.length);
      done();
    });
  });

  it('GET /search without q query throws error', done => {
    const options = {
      method: 'GET',
      url: '/search',
    };
    server.inject(options, res => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });

  after(done => {
    // restore all sinon objects
    Request.Request.prototype.end.restore();
    done();
  });
});

