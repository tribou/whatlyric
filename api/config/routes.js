const SearchController = require('../controllers/search.js');

export const routes = [{
  method: 'GET',
  path: '/search',
  config: SearchController.search,
}, {  // Non-controller paths
  method: 'GET',
  path: '/',
  handler: {
    view: 'index',
  },
}, {
  method: 'GET',
  path: '/static/{param*}',
  handler: {
    directory: {
      path: 'web/static',
    },
  },
}];

