// Testing the search controller
const Lab = require('lab');
const Code = require('code');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Search Controller API', () => {
  const Hapi = require('hapi');
  const server = new Hapi.Server();
  const SearchController = require('../search.js').search;
  // Only include search
  const routes = require('../../config/routes.js').routes.filter((route) => {
    return route.path === '/search';
  });
  server.connection();
  server.route(routes);

  it('GET /search without q query throws error', (done) => {
    const options = {
      method: 'GET',
      url: '/search',
    };
    server.inject(options, (res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
});

