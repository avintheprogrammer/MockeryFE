/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import ErrorHandler from '../../components/ErrorHandler';
import ArticleTickerComponent from '../../components/ArticleTicker';

/**
 * Pure React component that acts as a higher-order component to render the Article Ticker with the right props.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} data Object containing information about the article passed down from GraphQL.
 * @param {number} dataId Tracking ID used for testing.
 * @returns {function} A React component that renders out the Article Banner.
 */
const ArticleTicker = props => {
  const { data: articleTicker, dataId } = props;
  if (!articleTicker) {
    return (
      <ErrorHandler
        data={{ error: 'ArticleTicker query came back as null' }}
        errorSource="ArticleTicker"
        errorProps={props}
      />
    );
  }

  if (
    articleTicker.assets &&
    articleTicker.assets.length &&
    articleTicker.assets.length > 0
  ) {
    // Create a properly structured object of cards to render.
    const theCards = articleTicker.assets.map(asset => ({
      id: asset.id || '',
      type: asset.premium ? 'pro' : '',
      assetType: asset.type || '', 
      title: asset.headline || '',
      description: asset.description || '',
      img:
        asset.type === 'mockeryvideo'
          ? asset.image ? asset.image.url : ''
          : asset.promoImage ? asset.promoImage.url : '',
      url: asset.url ? asset.url : '#',
      tag: asset.section && asset.section.title ? asset.section.title : '',
      // @TODO How do I render this?
      isLive: false,
      shorterHeadline: asset.shorterHeadline ? asset.shorterHeadline : asset.headline,
      brand: asset.brand || '',
      sectionSubType: (asset.section && asset.section.subType) || ''
    }));

    return <ArticleTickerComponent cards={theCards} dataId={dataId} />;
  }

  // Otherwise, don't render anything.
  return null;
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 */
ArticleTicker.propTypes = {
  data: PropTypes.object.isRequired,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArticleTicker.defaultProps = {
  dataId: 0,
};

export { ArticleTicker };

export default ArticleTicker;
