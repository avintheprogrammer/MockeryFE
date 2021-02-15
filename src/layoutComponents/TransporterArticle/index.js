import React from 'react';
import PropTypes from 'prop-types';

import TransporterBuilder from '../../containers/TransporterBuilder';
import ErrorHandler from '../../components/ErrorHandler';

/**
 * Pure React component that acts as a higher-order component to render the proper Transporter with the right props.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} data Object containing information about the article passed down from GraphQL.
 * @param {number} dataId Tracking ID used for testing.
 * @returns {function} A React component that renders out the Article Banner.
 */
const TransporterArticle = props => {
  const { data: article, dataId, isProUser, titleOverride, premium, isSpecialReport} = props;

  if (!article) {
    return (
      <ErrorHandler
        data={{ error: 'Article query came back as null' }}
        errorSource="TransporterArticle"
        errorProps={props}
      />
    );
  }

  if (!article.relatedArticle) return null;

  return (
    <TransporterBuilder
      id={article.relatedArticle.id}
      originalUrl={article.url}
      originalId={article.id}
      originalTitle={article.title}
      dataId={dataId}
      isProUser={isProUser}
      titleOverride={titleOverride}
      premium={premium}
      isSpecialReport={isSpecialReport}
    />
  );
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 */
TransporterArticle.propTypes = {
  data: PropTypes.object.isRequired,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isProUser: PropTypes.bool.isRequired,
  titleOverride: PropTypes.string,
  premium: PropTypes.bool.isRequired,
  isSpecialReport: PropTypes.bool.isRequired,
};

TransporterArticle.defaultProps = {
  dataId: 0,
  isProUser: false,
  titleOverride: '',
};

export { TransporterArticle };

export default TransporterArticle;
