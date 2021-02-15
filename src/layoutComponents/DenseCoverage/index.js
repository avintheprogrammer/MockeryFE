import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import query from './query';
import ErrorHandler from '../../components/ErrorHandler';
import Layout from '../../components/Layout';
import { denseCardMocks } from '../../components/Card/__mocks__/cardMocks';

/**
 * Pure React component that acts as a higher-order component to render the proper Dense Coverage module with the right props.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} data Object containing information about the article passed down from GraphQL.
 * @param {number} dataId Tracking ID used for testing.
 * @returns {function} A React component that renders out the Dense Coverage module.
 */
const DenseCoverage = (props) => {
  const {data, dataId} = props;
  if (data.loading) {
    return <div />;
  }

  if (data.error) {
    return <ErrorHandler data={data} errorSource="DenseCoverage" errorProps={props} />;
  }

  if (!data.assetList) {
    return (
      <ErrorHandler
        data={{ error: 'AssetList query came back as null' }}
        errorSource="DenseCoverage"
        errorProps={props}
      />
    );
  }

  return (
    <div id={dataId}>
      <Layout cards={denseCardMocks} dataId={dataId} layoutType="dense" />
    </div>
  );
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 */
DenseCoverage.propTypes = {
  data: PropTypes.object.isRequired,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DenseCoverage.defaultProps = {
  dataId: 0,
};

export { DenseCoverage };

export default graphql(query, {
  options: props => ({
    variables: {
      id: props.id,
      clientComponent: 'DenseCoverage',
      clientProps: props,
    },
  }),
})(DenseCoverage);
