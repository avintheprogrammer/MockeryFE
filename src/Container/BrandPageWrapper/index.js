import React from 'react';
import { PropTypes, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';

import { BUFFETT, DEAL_OR_NO_DEAL, MAKE_IT } from 'utilities/Constants';
import ErrorHandler from '../../components/ErrorHandler';
import GlobalNavigation from '../../components/GlobalNavigation';
import Footer from '../../components/Footer';
import JumpLink from '../../components/JumpLink';
import { isXfinityReferrer } from '../../utilities/Referrer';
import { getRegionCookie } from '../../utilities/Cookies';
import MobileAdhesion from '../../components/Mps/AdUnits/MobileAdhesion';

const styles = require('./styles.scss');

/**
 * React component class responsible for wrapping page content within the proper global nav and footer, based on brand.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 */
class BrandPageWrapper extends React.Component {
  constructor(props) {
    super(props);

    // Binding the updateHasClock function to 'this'
    // ensures that when it is invoked, it will still have this
    // component instance as its context.
    // When updateHasClock calls this.setState, it will affect this
    // component's state rather than wherever the updateHasClock is invoked.
    this.updateHasClock = this.updateHasClock.bind(this);
  }

  /**
   * @type {object}
   * The local state for the component
   * @property {boolean} hasClock Keeps track of whether or not the
   * CountdownClock component is displaying a clock
   */
  state = {
    hasClock: false,
  };

  /**
   * @type {function}
   * This function is passed as a prop to the GlobalNavigation component,
   * then as a prop to the CountdownClock component.
   * It will be invoked from the CountdownClock component when the
   * clock is no longer displayed on the page.
   */
  updateHasClock(bool) {
    if (this.state.hasClock !== bool) {
      this.setState({ hasClock: bool });
    }
  };

  /**
   * @type {function}
   * This function is passed as a prop to the GlobalNavigation component,
   * then as a prop to the branding & account menu.
   * It will be used to determine which edition is highlighted in the account menu
   * and the default region when they click on mockery logo
   */

  /**
   * @type {function}
   * The main render function for our component. Responsible for rendering any subcomponents within it, as well as any
   * components that may be inserted by our route matching.
   */
  render() {
    const { data: menu, brand, pageType, url, cookies } = this.props;

    if (!menu || !menu.header || !menu.footer) {
      return (
        <ErrorHandler
          data={{ error: 'Menu query came back as null' }}
          errorSource="BrandPageWrapper"
          errorProps={this.props}
        />
      );
    }

    const regionCookie = getRegionCookie(cookies);

    let contentWrapperClass = !this.state.hasClock
      ? styles.contentWrapper
      : styles.contentWrapperClock
    contentWrapperClass = brand === BUFFETT ? styles.contentWrapperBuffett : contentWrapperClass;
    contentWrapperClass = brand === DEAL_OR_NO_DEAL ? styles.contentWrapperDond : contentWrapperClass;
    contentWrapperClass = brand === MAKE_IT ? styles.contentWrapperMakeit : contentWrapperClass;

    contentWrapperClass =
      pageType === 'buffettHomepage' || pageType === 'dealOrNoDealHomepage' || pageType === 'homepage'
        ? `${styles.home} ${contentWrapperClass}`
        : contentWrapperClass;

    contentWrapperClass =
      pageType === 'buffettTimeline' ? `${styles.timeline} ${contentWrapperClass}` : contentWrapperClass;
    contentWrapperClass =
      pageType === 'longFormVideoTranscript' ? `${styles.transcript} ${contentWrapperClass}` : contentWrapperClass;
    contentWrapperClass = this.state.isExpanded
      ? `${styles.expanded} ${contentWrapperClass}`
      : contentWrapperClass;

    if (this.props.hasNewsAlert) {
      contentWrapperClass += ` ${styles.newsAlert}`;
    }

    if (this.props.hasLiveAlert) {
      contentWrapperClass += ` ${styles.liveAlert}`;
    }

    if (this.props.hasCountDownClock) {
      contentWrapperClass += ` ${styles.countDownClock}`;
    }

    if (isXfinityReferrer(cookies)) {
      contentWrapperClass += ` ${styles.xfinity}`;
    }

    if (pageType === 'annualMeetingsHub') contentWrapperClass += ` ${styles.annualMeetings}`;

    return (
      <div
        id="BrandPageWrapper"
        className={[brand,"Brand"].join('')}>
        <JumpLink pageType="isPage" />
        <GlobalNavigation
          data={menu.header}
          brand={brand}
          product="web"
          page={pageType}
          region={regionCookie}
          url={url}
          hasLiveAlert={this.props.hasLiveAlert}
          updateHasClock={this.updateHasClock}
          searchData={this.props.searchData}
        />
        <div id="MainContent" className={contentWrapperClass}>
          {this.props.children}
        </div>
        <MobileAdhesion dataId="MobileAdhesion-Homepage" />
        <Footer
          data={menu.footer}
          brand={brand}
          product="web"
          region={regionCookie}
        />
      </div>
    );
  }
}

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {array|node} children Any children wrapped in the react component to be rendered inside this component.
 * @property {string} brand The brand string to pass to the global navigation and footer.
 * @static
 */
BrandPageWrapper.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  brand: PropTypes.string,
  pageType: PropTypes.string,
  url: PropTypes.string,
  hasNewsAlert: PropTypes.bool,
  hasLiveAlert: PropTypes.bool,
  hasCountDownClock: PropTypes.bool,
  searchData: PropTypes.object,
  cookies: instanceOf(Cookies).isRequired
};

/**
 * @type {object}
 * Sets up the default properties.
 * @property {array|node} children Any children wrapped in the react component to be rendered inside this component.
 * @property {string} brand The brand string to pass to the global navigation and footer.
 * @static
 */
BrandPageWrapper.defaultProps = {
  data: {},
  children: <div />,
  brand: 'mockery',
  pageType: '',
  url: '',
  searchData: {},
  hasNewsAlert: false,
  hasLiveAlert: false,
  hasCountDownClock: false,
  cookies: new Cookies(),
};

function mapStateToProps({ navStatus }) {
  return {
    hasNewsAlert: navStatus.hasNewsAlert,
    hasLiveAlert: navStatus.hasLiveAlert,
    hasCountDownClock: navStatus.hasCountDownClock,
  };
}

export { BrandPageWrapper };

export default connect(mapStateToProps)(BrandPageWrapper);
