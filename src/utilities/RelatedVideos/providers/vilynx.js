import query from '../queries/videos';

const VILYNX_CHECK_INTERVAL_MS = 50;
const VILYNX_TIMEOUT = 5000; // 5 seconds

/**
 * Async wait helper
 * @param {Int} duration Milliseconds to wait
 */
function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

/**
 * Recursive async checker for vilynxRecommendations object
 * @param {Int} cumulativeWaitTime How long waited so far
 */
function checkClient(cumulativeWaitTime) {
  if (typeof vilynxRecommendations === 'object') {
    return Promise.resolve(vilynxRecommendations);
  }
  if (cumulativeWaitTime > VILYNX_TIMEOUT) {
    return Promise.reject(new Error('Timeout waiting for vilynx rec module.'));
  }
  return wait(VILYNX_CHECK_INTERVAL_MS).then(() => (
    checkClient(cumulativeWaitTime + VILYNX_CHECK_INTERVAL_MS)
  ));
}

function getVilynxClient() {
  return checkClient(0);
}

/**
 * Internal helper function for calling vilynx library
 * @param {String} url required, Vilynx recs keyed off url
 * @param {Int} count optional, number of items requested
 * @param {Object} vilynxClient required
 */
export function getVilynxRecommendations(url, count, vilynxClient) {
  if (!url) {
    return Promise.reject(new Error('url required.'));
  }
  if (!vilynxClient) {
    return Promise.reject(new Error('Vilynx library is required.'));
  }

  const options = {
    limit: count,
    type: ['video'],
    retrieveguid: true
  };

  // Vilynx SDK uses a callback, this promisifies Vilynx response
  return new Promise((resolve, reject) => {
    const handleRecs = (recommendations) => {
      if (recommendations && recommendations.length) {
        const ids = recommendations.map((rec) => parseInt(rec, 10));
        return resolve(ids);
      }
      return reject(new Error('No recommendations found.'));
    }
    vilynxClient.get(url, handleRecs, options);
  });
};

/**
 * Internal helper function for hydrating list of video ids via GQL
 * @param {Array} ids required, list of video ids
 * @param {Object} gqlClient required
 */
export function getVideosFromIds(ids, gqlClient) {
  if (!ids || !Array.isArray(ids)) {
    return Promise.reject(new Error('ids must be an array'));
  }
  if (!gqlClient) {
    return Promise.reject(new Error('gqlClient requied'));
  }

  return gqlClient.query({
    query,
    variables: {
      ids
    },
    fetchPolicy: 'network-only'
  }).then((results) => results.data.videos);
}

/**
 * Entry point for Vilynx recommendations
 * @param {Object} params { url, count } url = url of video to retrieve recs for, count = num items to fetch
 * @param {Object} context { gqlClient } GraphQl client
 * @param {Object} _getVilynxClient For test dependency injection
 */
export function getRecommendations(params, context, _getVilynxClient = getVilynxClient) {
  const { url, count = 1 } = params;
  const { gqlClient } = context;
  return _getVilynxClient().then((vilynxClient) => (
    getVilynxRecommendations(url, count, vilynxClient).then((ids) => (
      getVideosFromIds(ids, gqlClient)
    )
  )));
}

export default {
  getRecommendations
};
