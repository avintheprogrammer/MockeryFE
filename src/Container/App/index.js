/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import smartquotes from 'smartquotes';
import es6Promise from 'es6-promise';
import 'isomorphic-fetch';

import { renderRoutes } from 'react-router-config';
import BigTimeEventBus from 'utilities/EventBus';
import Breakpoints from 'utilities/Breakpoints';
import UniversalVideoPlayer from 'components/Video/UniversalVideoPlayer';

const styles = require('./styles.scss');

// Needed for IE11.
es6Promise.polyfill();

/**
 * Root App Component
 * Our root component that renders our Global Navigation and Footer, and renders our actual page based on routing
 * rules. Our routing approach here strays from a typical react-router setup with predefined rulesets matching url
 * strings. We instead use a database-based approach to send our pathname to the GraphQL endpoint to get back a
 * configuration object that will tell us the type of page, what components are on it, and how to construct it.
 * Implements <code>componentDidMount()</code> to instantiate global scroll and resize monitoring.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 */
class App extends React.Component {
  /**
   * @type {object}
   * @property {bool} clicking Track whether a user is clicking or
   * not clicking (tabbing) through the page
   */
  state = { clicking: true };

  /**
   * @type {function}
   * Instantiates our global event utility to start tracking scroll,
   * resize, click, keyup, and breakpoint change.
   * @see BigTimeEventBus.monitorScroll()
   * @see BigTimeEventBus.monitorResize()
   * @see BigTimeEventBus.monitorClick()
   * @see BigTimeEventBus.monitorKeyup()
   * @see Breakpoints.monitorBreakpoints()
   */
  componentDidMount() {

    BigTimeEventBus.monitorScroll();
    BigTimeEventBus.monitorResize();
    BigTimeEventBus.monitorBodyResize();
    BigTimeEventBus.monitorImagesLoad();
    BigTimeEventBus.monitorClick();
    BigTimeEventBus.monitorKeyup();
    BigTimeEventBus.monitorRoute();
    Breakpoints.monitorBreakpoints();
    smartquotes().listen();

    BigTimeEventBus.on('click', this.handleClick.bind(this), 'none');
    BigTimeEventBus.on('keyup', this.handleKeyup.bind(this), 'none');
  }

  /**
   * @type {function}
   * This React lifecycle method clears the event listeners if the
   * component unmounts.
   */
  componentWillUnmount() {
    BigTimeEventBus.remove('click', this.handleClick);
    BigTimeEventBus.remove('keyup', this.handleKeyup);
  }

  /**
   * @type {function}
   * Indicatest that a user is navigating by clicking on the page.
   */
  handleClick = () => {
    if (!this.state.clicking) {
      this.setState({ clicking: true });
    }
  };

  /**
   * @type {function}
   * Indicates that a user is navigating by tabbing through the page.
   * @param {object} e The event.
   */
  handleKeyup = e => {
    if (e.key === 'Tab' && this.state.clicking) {
      this.setState({ clicking: false });
    }
  };

  /**
   * @type {function}
   * The main render function for our component. Responsible for rendering any subcomponents within it, as well as any
   * components that may be inserted by our route matching.
   */
  render() {
    return (
      <div className={this.state.clicking ? styles.containerClick : styles.container}>
        {renderRoutes(this.props.route.routes)}
        <UniversalVideoPlayer />
      </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired,
};

export default App;
