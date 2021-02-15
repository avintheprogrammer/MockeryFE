import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { isPrimeShow } from 'lib/asset';
import { BUFFETT, DEAL_OR_NO_DEAL } from 'utilities/Constants';

import globalAppConfig from '../app/PhoenixConfig';
import { getCookie } from './Cookies';

const {
  ACCEPTABLE_ARTICLE_TYPES = '',
  INBOUND_IDS = '',
  NODE_ENV,
  SPA_ENABLED,
  RELATIVE_URL,
} = globalAppConfig.getProperties();
const MOCKERY_DOMAIN_SUFFIX = 'mockery.com';

const inboundIDs = (INBOUND_IDS && JSON.parse(INBOUND_IDS)) || [];
const acceptableTypes = (ACCEPTABLE_ARTICLE_TYPES && ACCEPTABLE_ARTICLE_TYPES.split(',')) || [];

function generateHref(href) {
  if (!href) return '#';

  if (href.indexOf('http') !== 0) return href;

  if (RELATIVE_URL !== 'true') return href;

  const domainPosition = href.indexOf(MOCKERY_DOMAIN_SUFFIX);

  if (domainPosition === -1) return href;

  return `${href.substr(domainPosition + MOCKERY_DOMAIN_SUFFIX.length)}`;
}

function urlDetails(url) {
  const parser = document.createElement('a');
  parser.href = url;
  return parser;
}

function isInboundLink({ hostname, pageID, currentBrand, brand, assetType, menu, sectionSubType, native, premium }) {
  if (window && window.location.hostname !== hostname) {
    console.log("HOSTNAME MISMATCH");
    return false;
  }

  if (pageID && !inboundIDs.includes(pageID)) {
    console.log("IS NOT A SUPPORTED PAGE ID");
    return false;
  }

  if (!window.location.hostname.includes('buffett') && (!brand || currentBrand !== brand)) {
    console.log("BRAND MISMATCH");
    return false;
  }

  if (!menu && (!assetType || !acceptableTypes.includes(assetType))) {
    console.log("IS NOT A SUPPORTED ASSET TYPE");
    return false;
  }

  if (
    NODE_ENV !== 'development' &&
    getCookie('article_experience') !== 'phoenix' &&
    brand !== BUFFETT &&
    brand !== DEAL_OR_NO_DEAL &&
    assetType !== 'mockeryvideo'
  ) {
    console.log("ARTICLE EXPERIENCE COOKIE NOT SET FOR MOCKERY")
    return false;
  }

  if (assetType === 'mockeryvideo') {
    if (NODE_ENV !== 'development' && brand === MOCKERY && getCookie('video_experience') !== 'phoenix') {
      console.log("VIDEO EXPERIENCE COOKIE NOT SET");
      return false;
    }
  
    if (brand === MOCKERY && premium) {
      console.log("VIDEO IS PREMIUM");
      return false;
    }
  }

  if (
    currentBrand !== BUFFETT
    &&
    currentBrand !== DEAL_OR_NO_DEAL
    &&
    !window.location.hostname.includes('buffett')
    &&
    (!sectionSubType || isPrimeShow(sectionSubType))
  ) {
    console.log("DIDN'T PROVIDE SECTION SUBTYPE OR IS A PRIME SHOW");
    return false;
  }

  if (
    currentBrand !== 'buffett'
    &&
    !window.location.hostname.includes('buffett')
    &&
    native
  ) {
    console.log("NATIVE IS LEGACY OR LEGACY WEB");
    return false;
  }

  return true;
}

function isCmdKeyPressingEvent(e) {
  return e.ctrlKey || e.metaKey;
}

const MOCKERYLink = ({
  children,
  to,
  target,
  className,
  alt,
  title,
  style,
  history,
  key,
  role,
  tabIndex,
  dataType,
  ariaLabel,
  onMouseEnter,
  onMouseLeave,
  preRouteChange,
  postRouteChange,
  onClick,
  pageID,
  brand,
  currentBrand,
  menu,
  assetType,
  sectionSubType,
  native,
  renderAsDiv,
  premium,
}) => {
  function handleClick(e) {
    e.cancelBubble = true; // stop click events from bubbling up in IE
    if (e.stopPropagation) e.stopPropagation(); // stop click events from bubbling up in other browsers

    const href = renderAsDiv ? generateHref(to) : (e.currentTarget.href || '/');

    if (preRouteChange) preRouteChange();

    if (isCmdKeyPressingEvent(e)) {
      e.preventDefault();

      window.open(href);

      return;
    }

    if (SPA_ENABLED === 'true') {
      e.preventDefault();

      const isIE = false || !!document.documentMode; // checks for IE6 - IE11
      const { hostname, pathname, search } = urlDetails(href);

      const shouldInbound = isInboundLink({
        hostname,
        pageID,
        currentBrand,
        brand,
        assetType,
        menu,
        sectionSubType,
        native,
        premium
      });

      if (isIE && shouldInbound) {
        history.push({ pathname: `/${pathname}`, search });
        return;
      }

      if (shouldInbound) {
        history.push({ pathname, search });
        if (postRouteChange) postRouteChange();
        return;
      }

      window.open(href, '_self');
      return;
    }

    if (renderAsDiv) {
      window.open(href, '_self'); // because it's a div we don't have a link action to fallback too
    }
  }

  if (renderAsDiv) {
    return (
      <div className={className} onClick={handleClick} role="button" tabIndex={tabIndex}>
        {children}
      </div>
    )
  }

  return (
    <a
      href={generateHref(to)}
      alt={alt}
      className={className}
      onClick={target !== '_blank' ? onClick || handleClick : null}
      target={target}
      style={style}
      title={title}
      key={key}
      role={role}
      tabIndex={tabIndex}
      data-type={dataType}
      aria-label={ariaLabel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

MOCKERYLink.propTypes = {
  history: PropTypes.object.isRequired,
  to: PropTypes.string,
  title: PropTypes.string,
  role: PropTypes.string,
  ariaLabel: PropTypes.string,
  dataType: PropTypes.string,
  key: PropTypes.string,
  tabIndex: PropTypes.string,
  children: PropTypes.node,
  target: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.object,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  preRouteChange: PropTypes.func,
  postRouteChange: PropTypes.func,
  onClick: PropTypes.func,
  pageID: PropTypes.number,
  brand: PropTypes.string,
  currentBrand: PropTypes.string,
  assetType: PropTypes.string,
  menu: PropTypes.bool,
  native: PropTypes.bool,
  sectionSubType: PropTypes.string,
  renderAsDiv: PropTypes.bool,
  premium: PropTypes.bool,
};

MOCKERYLink.defaultProps = {
  to: '#',
  target: '',
  title: '',
  role: '',
  key: '',
  ariaLabel: '',
  dataType: '',
  tabIndex: '',
  children: '',
  className: '',
  alt: '',
  style: {},
  onMouseEnter: null,
  onMouseLeave: null,
  preRouteChange: null,
  postRouteChange: null,
  onClick: null,
  pageID: null,
  brand: null,
  currentBrand: null,
  assetType: null,
  menu: null,
  native: false,
  sectionSubType: null,
  renderAsDiv: false,
  premium: false,
};

function mapStateToProps(state) {
  const { brand: currentBrand } = state.page.page || {};
  return { currentBrand };
}

export { MOCKERYLink };

export default connect(mapStateToProps)(withRouter(MOCKERYLink));
