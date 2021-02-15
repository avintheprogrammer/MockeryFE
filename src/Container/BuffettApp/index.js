import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import GlobalNavigation from '../../components/GlobalNavigation/Buffett';
import BigTimeEventBus from '../../utilities/EventBus';
import Breakpoints from '../../utilities/Breakpoints';

const styles = require('./styles.scss');

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
class BuffettApp extends React.Component {
  /**
   * @type {function}
   * Instantiates our global event utility to start tracking scroll, resize, and breakpoint change.
   * @see BigTimeEventBus.monitorScroll()
   * @see BigTimeEventBus.monitorResize()
   * @see Breakpoints.monitorBreakpoints()
   */
  componentDidMount() {
    BigTimeEventBus.monitorScroll();
    BigTimeEventBus.monitorResize();
    Breakpoints.monitorBreakpoints();
  }


  /**
   * @type {function}
   * The main render function for our component. Responsible for rendering any subcomponents within it, as well as any
   * components that may be inserted by our route matching.
   */
  render() {
    return (
      <div className={styles.container}>
        <GlobalNavigation />
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

BuffettApp.propTypes = {
  route: PropTypes.object.isRequired,
};

export default BuffettApp;
