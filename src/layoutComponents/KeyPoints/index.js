import React from 'react';
import PropTypes from 'prop-types';

import KeyPointsComponent from '../../components/Article/KeyPoints';
import ErrorHandler from '../../components/ErrorHandler';

/**
 * Pure React component that acts as a higher-order component to render the proper KeyPoints with the right props.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} data Object containing information about the article passed down from GraphQL.
 * @param {number} dataId Tracking ID used for testing.
 * @returns {function} A React component that renders out the Article Banner.
 */
const KeyPoints = (props) => {
  const {data: article, dataId} = props;

  if (!article) {
    return (
      <ErrorHandler data={{ error: 'Article query came back as null' }} errorSource="KeyPoints" errorProps={props} />
    );
  }

  return <KeyPointsComponent data={article} dataId={dataId} />;
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 */
KeyPoints.propTypes = {
  data: PropTypes.object.isRequired,
  dataId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

KeyPoints.defaultProps = {
  dataId: 0,
};

export { KeyPoints };

export default KeyPoints;
