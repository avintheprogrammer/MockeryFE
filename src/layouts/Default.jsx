/* eslint react/prefer-stateless-function: 0, react/no-danger: 0, react/forbid-prop-types: 0 */
/* eslint no-underscore-dangle: 0, global-require: 0 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

import { WINDOW_STORE_VAR, WINDOW_CACHE_VAR } from '../app/constants';

export default class Default extends React.Component {
  render() {
    const { assets, bundles, component, store, client, helmet } = this.props;
    const content = component ? ReactDOMServer.renderToString(component) : '';
    const htmlAttrs = helmet && helmet.htmlAttributes && helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet && helmet.bodyAttributes && helmet.bodyAttributes.toComponent();
    const helmetMeta = data => [
      data && data.title && data.title.toComponent(),
      data && data.meta && data.meta.toComponent(),
      data && data.link && data.link.toComponent(),
      data && data.noscript && data.noscript.toComponent(),
      data && data.style && data.style.toComponent(),
      data && data.script && data.script.toComponent(),
    ];

    const cssBundles = bundles.filter(bundle => bundle && bundle.file.split('.').pop() === 'map');
    const jsBundles = bundles.filter(bundle => bundle && bundle.file.split('.').pop() === 'js');

    return (
      <html {...htmlAttrs}>
        <head>
          {helmet && helmetMeta(helmet)}
          {/* production */}
          <link
            href={assets.styles.main}
            rel="preload"
            as="style"
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
          />
          {
            cssBundles.map(bundle => {
              return (
                <link
                  href={bundle.publicPath}
                  rel="preload"
                  as="style"
                  media="screen, projection"
                  rel="stylesheet"
                  type="text/css"
                  charSet="UTF-8"
                />
              )
            })
          }
        </head>
        <body {...bodyAttrs}>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.${WINDOW_STORE_VAR}=${serialize(store.getState())}; window.${
                WINDOW_CACHE_VAR
              }=${serialize(client.cache.extract())};`,
            }}
            charSet="UTF-8"
          />
          <script src={assets.javascript.manifest} charSet="UTF-8" />
          {
            jsBundles.map(bundle => {
              return (<script src={bundle.publicPath} />);
            })
          }
          <script src={assets.javascript.main} charSet="UTF-8" />
          <script src={assets.javascript.lazyMain} charSet="UTF-8" />
        </body> 
      </html>
    );
  }
}

Default.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
};
