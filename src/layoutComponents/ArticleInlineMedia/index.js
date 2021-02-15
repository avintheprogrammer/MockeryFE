import React from 'react';
import PropTypes from 'prop-types';

import InlineImage from '../../components/Article/InlineImage';
import Placeholder from '../../components/Video/UniversalVideoPlayer/PlaceHolder';
import ErrorHandler from '../../components/ErrorHandler';

/**
 * Pure React component that acts as a higher-order component to render the proper Inline Medis with the right props.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} data Object containing information about the article passed down from GraphQL.
 * @param {number} dataId Tracking ID used for testing.
 * @returns {function} A React component that renders out the Article Banner.
 */
const ArticleInlineMedia = props => {
  const { data: article, dataId } = props;

  if (!article) {
    return (
      <ErrorHandler
        data={{ error: 'Article query came back as null' }}
        errorSource="ArticleInlineMedia"
        errorProps={props}
      />
    );
  }

  const { featuredMedia } = article;

  if (featuredMedia && featuredMedia.type === 'image' && !featuredMedia.isHighTouch) {
    return <InlineImage data={article} dataId={dataId} brand={article.brand} isFeaturedMedia />;
  }

  if (featuredMedia && featuredMedia.type === 'mockeryvideo') {
    return (
      <Placeholder
        isPro={false}
        isLive={false}
        isPackage={false}
        cardType={'featured-rectangle-media'}
        packageTitle={''}
        brand={featuredMedia.brand}
        videoData={featuredMedia}
        inlineVideoPlayback
        inlineVideoComponent
        id={`ArticleBody-Video-featuredMedia-${featuredMedia.id}`}
        dataId={`ArticleBody-Video-featuredMedia-${featuredMedia.id}`}
      />
    );
  }

  return null;
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 */
ArticleInlineMedia.propTypes = {
  data: PropTypes.object.isRequired,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArticleInlineMedia.defaultProps = {
  dataId: 0,
};

export default ArticleInlineMedia;
