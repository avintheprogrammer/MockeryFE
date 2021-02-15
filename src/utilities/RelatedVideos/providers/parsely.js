import { isNumber } from "util";
import query from '../queries/videoRecommendations';

// eslint-disable-next-line import/prefer-default-export
export function getRecommendations(params, context) {
  const { id, count = 1, url } = params;
  const { gqlClient } = context;
  if (!gqlClient) {
    return Promise.reject(new Error('gqlClient required.'));
  }
  if (!isNumber(id)) {
    return Promise.reject(new Error('Invalid ID.'));
  }
  if (!url) {
    return Promise.reject(new Error('Invalid URL.'));
  }

  return gqlClient.query({
    query,
    variables: {
      id,
      count,
      url
    },
    fetchPolicy: 'network-only',
  }).then((results) => results.data.videoRecommendations);
};

export default {
  getRecommendations
};
