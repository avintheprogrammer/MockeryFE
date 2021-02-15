import query from './query';

// eslint-disable-next-line import/prefer-default-export
export function loadVideoById(videoId, gqlClient) {
  return gqlClient.query({
    query,
    variables: {
      videoId
    },
    fetchPolicy: 'network-only'
  }).then((results) => results.data.video);
}
