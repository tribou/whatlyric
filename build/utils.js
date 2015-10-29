const Package = require('../package.json');

export function getJsBundle() {
  return `bundle-${Package.version}.js`;
}

