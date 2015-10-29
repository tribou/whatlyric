// Export Hapi plugins
export const plugins = [{
  register: require('inert'),
}, {
  register: require('vision'),
}, {
  register: require('good'),
  options: {
    opsInterval: 5000,
    reporters: [{
      reporter: require('good-console'),
      events: { log: '*', request: '*', response: '*', error: '*' },
    }],
  },
}, {
  register: require('hapi-swagger'),
}];

