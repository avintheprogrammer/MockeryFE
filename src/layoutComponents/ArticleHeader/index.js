/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Article/ArticleHeader';
import BrandBanner from '../../components/Article/BrandBanner';
import ErrorHandler from '../../components/ErrorHandler';

/**
 * Pure React component that acts as a higher-order component to render the proper Article Header with the right props.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} data Object containing information about the article passed down from GraphQL.
 * @param {bool} isTransporter Whether or not this is a transporter.
 * @param {number} dataId Tracking ID used for testing.
 * @param {number} brand Used for styles for .com, buffet or makeit.
  * @returns {function} A React component that renders out the Article Banner.
 */
const ArticleHeader = props => {
  const { data: article, isTransporter, isSpecialReport, dataId, brand } = props;

  if (!article) {
    return (
      <ErrorHandler
        data={{ error: 'Article query came back as null' }}
        errorSource="ArticleHeader"
        errorProps={props}
      />
    );
  }

  // Checking to see whether or not to render the featured background.
  let hasBackground;
  if (
    article.featuredMedia &&
    article.featuredMedia.type === 'image' &&
    article.featuredMedia.isHighTouch
  ) {
    hasBackground = true;
  } else {
    hasBackground = false;
  }

  const topSection = article.native ? (
    Array.isArray(article.sourceOrganization) &&
    article.sourceOrganization.length > 0 &&
    article.sourceOrganization[0].creatorOverwrite  ? (
      <BrandBanner text={article.sourceOrganization[0].creatorOverwrite} brand={brand} position='top' />
    ) : (
      <BrandBanner />
    )
  ) : null;

  return (
    <div id={dataId}>
      {topSection}
      <Header
        data={article}
        hasBackground={hasBackground}
        isTransporter={isTransporter}
        isSpecialReport={isSpecialReport}
        dataId={dataId}
        brand={brand}
      />
    </div>
  );
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 */
ArticleHeader.propTypes = {
  data: PropTypes.object.isRequired,
  isTransporter: PropTypes.bool,
  isSpecialReport: PropTypes.bool,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  brand: PropTypes.string,
};

ArticleHeader.defaultProps = {
  isTransporter: false,
  isSpecialReport: false,
  dataId: 0,
  brand: '',
};

export { ArticleHeader };

export default ArticleHeader;
