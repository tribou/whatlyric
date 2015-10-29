jest.autoMockOff();

describe('Search Controller API', () => {
  const Hapi = require('hapi');
  const server = new Hapi.Server();
  const SearchController = require('../search.js');
  const routes = require('../../config/routes.js');
  server.connection({ port: 80 });
  server.routes(routes);
});

