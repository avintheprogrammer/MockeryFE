/* eslint react/prefer-stateless-function: 0, react/no-danger: 0, react/forbid-prop-types: 0 */
/* eslint no-underscore-dangle: 0, global-require: 0 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

import { WINDOW_STORE_VAR, WINDOW_CACHE_VAR } from '../app/constants';

export default class Component extends React.Component {
  render() {
    const { assets, component, store, client, params } = this.props;
    const content = component ? ReactDOMServer.renderToString(component) : '';
    const name = params.name;

    return (
      <div className="AppMockeryPhoenix">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {params.migrated
        && <link
          href={assets.styles[name]}
          media="screen, projection"
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
        />}
        <div id={`standalone-${name}`} dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.${WINDOW_STORE_VAR}=${serialize(store.getState())}; window.${WINDOW_CACHE_VAR}=${serialize(client.cache.extract())};`,
          }}
          charSet="UTF-8"
        />
        <script src={assets.javascript.manifest} charSet="UTF-8" />
        <script src={assets.javascript[name]} charSet="UTF-8" />
      </div>
    );
  }
}

Component.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
  name: PropTypes.string
};
