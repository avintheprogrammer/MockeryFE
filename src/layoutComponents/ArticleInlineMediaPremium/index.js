/* eslint-disable import/no-duplicates */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import ArticleInlineMedia from '../ArticleInlineMedia';
import ErrorHandler from '../../components/ErrorHandler';
import query from './query';


const ArticleInlineMediaPremium = props => {
    const { data, dataId } = props;

    if (data.loading) {
      return <div />;
    }

    if (data.error) {
      return <ErrorHandler data={data} errorSource="ArticleInlineMediaPremium" errorProps={props} />;
    }

    if (!data.article) {
      return (
        <ErrorHandler
          data={{ error: 'Article Premium featuredMedia query came back as null' }}
          errorSource="ArticleInlineMediaPremium"
          errorProps={props}
        />
      );
    }

    return (<ArticleInlineMedia data={data.article} dataId={dataId} />);
}

ArticleInlineMediaPremium.propTypes = {
  data: PropTypes.object.isRequired,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

function mapStateToProps({ authentication }) {
  const { uid, surfSessionToken } = authentication;

  return {
    uid,
    surfSessionToken,
  };
}

export default connect(mapStateToProps)(
  graphql(query, {
    options: props => ({
      variables: {
        id: props.id,
        uid: props.uid,
        sessionToken: props.surfSessionToken,
        clientComponent: 'ArticleInlineMedia',
        clientProps: props,
      },
    }),
  })(ArticleInlineMediaPremium)
);
