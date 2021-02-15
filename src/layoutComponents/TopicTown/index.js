import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import query from './query';
import ErrorHandler from '../../components/ErrorHandler';
import Layout from '../../components/Layout';
import { imageDenseCardMocks } from '../../components/Card/__mocks__/cardMocks';

/**
 * Pure React component that acts as a higher-order component to render the proper Topic Town module with the right props.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} data Object containing information about the article passed down from GraphQL.
 * @param {number} dataId Tracking ID used for testing.
 * @returns {function} A React component that renders out the Topic Town.
 */
const TopicTown = (props) => {
  const {data, dataId} = props;
  if (data.loading) {
    return <div />;
  }

  if (data.error) {
    return <ErrorHandler data={data} errorSource="TopicTown" errorProps={props} />;
  }

  if (!data.assetList) {
    return (
      <ErrorHandler data={{ error: 'AssetList query came back as null' }} errorSource="TopicTown" errorProps={props} />
    );
  }

  return (
    <div>
      <Layout cards={imageDenseCardMocks} dataId={dataId} layoutType="image-dense" />
    </div>
  );
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 */
TopicTown.propTypes = {
  data: PropTypes.object.isRequired,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TopicTown.defaultProps = {
  dataId: 0,
};

export { TopicTown };

export default graphql(query, {
  options: props => ({
    variables: {
      id: props.id,
      clientComponent: 'TopicTown',
      clientProps: props,
    },
  }),
})(TopicTown);
