/* eslint-disable global-require, import/no-dynamic-require */
require('./env.loader');

/* NOTE: We discourage the use of 'process.env' for any purpose within this
 * app.  However, New Relic is special.  All other uses of 'process.env' should
 * be replaced with 'globalAppConfig'. */
if (process.env.NEWRELIC_LICENSE_KEY)
{
  // eslint-disable-next-line global-require
  require('newrelic');
}

const path = require('path');
const webpackIsomorphicToolsConfig = require('./config/webpack-isomorphic-tools');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

const rootDir = path.resolve(__dirname, '.');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .server(rootDir, () => {
    require(`./${process.env.APP_DIR || 'src'}/app/phoenix`);
  });
