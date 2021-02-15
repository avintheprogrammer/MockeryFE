import React from 'react';
import PropTypes from 'prop-types';

import RelatedVideo from '../../components/RelatedVideo';
import RelatedWildcard from '../../components/RelatedWildcard';
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
const MakeItRelatedVideo = props => {
  const { data, dataId } = props;

  if (!data) {
    return (
      <ErrorHandler
        data={{ error: 'Article query came back as null' }}
        errorSource="MakeItRelatedVideo"
        errorProps={props}
      />
    );
  } 
  
  if (data.relatedVideo !== null && 
      data.relatedVideo.type !== null &&
      data.relatedVideo.type === 'mockeryvideo') {
        
      return (
        <RelatedVideo
          key={0}
          id={data.relatedVideo.id}
          dataId={dataId}
        />
    );
  }

  if (data.relatedVideo !== null && 
      data.relatedVideo.type !== null &&
      data.relatedVideo.type === 'wildcard') {
        
      return (
        <RelatedWildcard
          key={0} 
          id={data.relatedVideo.id} 
          dataId={dataId} 
        />
      );
  }

  return null
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 */
MakeItRelatedVideo.propTypes = {
  data: PropTypes.object.isRequired,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MakeItRelatedVideo.defaultProps = {
  dataId: 0,
};

export { MakeItRelatedVideo };

export default MakeItRelatedVideo;
