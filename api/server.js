// What lyric node.js server entrypoint

// Transform all API files with Babel
// https://babeljs.io/docs/usage/require/
require('babel/register')({});

// Create a Hapi.js server
const Hapi = require('hapi');

// Basic Hapi.js connection stuff
const server = new Hapi.Server();
const plugins = require('./config/plugins.js').plugins;
const routes = require('./config/routes.js').routes;
const getServerConnection = require('./config/env.js').getServerConnection;
server.connection(getServerConnection());

// Register plugins
server.register(plugins, err => {
  if (err) {
    console.error(err);
  }

  // Add the React-rendering view engine
  server.views({
    engines: {
      jsx: require('hapi-react-views'),
    },
    relativeTo: __dirname,
    path: 'views',
  });

  // Add a routes
  server.route(routes);

  // Start the server
  server.start(() => {
    server.log(['info'], 'Server started at: ' + server.info.uri);
    server.log(['info'], 'API docs: ' + server.info.uri + '/documentation');
  });
});

