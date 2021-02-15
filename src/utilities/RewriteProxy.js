import fetch from './CrossFetchWithProxy';

/**
 * Propagates the returned Fetch response to the specified Express response.
 * @param {Object} res The Express response.
 * @params {Object} response The Fetch response.
 */
async function onFetchResponse(res, response)
{
  const responseHeaders = response.headers.raw()
  res.status(response.status);
  Object.keys(responseHeaders).filter(header =>
    !(header === 'content-encoding' || header === 'content-length'))
  .forEach(header =>
  {
    const headers = responseHeaders[header];
    res.set(header, headers.length > 1 ? headers : headers[0]);
  });

  res.end(await response.buffer());
  return response;
}

/**
 * Captures information about the specified Fetch request and response for
 * troubleshooting routes.
 * @param {Object[]} fetchCollator An array of objects containing information
 * about requests and responses made for queries.
 * @params {Object} url The URL being requested.
 * @params {Object} options The HTTP options specified for the Fetch request.
 * @params {Date} startTime The time at which the fetch request was started.
 * @params {Object} response The Fetch response.
 */
function onFetchResponseCapture(
  fetchCollator, url, options, startTime, response)
{
  const requestInfo = { url, headers: options.headers };
  const responseHeaders = response.headers.raw();

  const responseInfo = {
    redirected: response.redirected,
    status: response.status,
    statusText: response.statusText,
    type: response.type,
    duration: Date.now() - startTime,

    headers: Object.keys(responseHeaders).reduce((headerSet, key) =>
    {
      // eslint-disable-next-line no-param-reassign
      headerSet[key] = responseHeaders[key][0];
      return headerSet;
    }, { }),
  };

  fetchCollator.push({ request: requestInfo, response: responseInfo });
  return response;
}

/**
 * Fetches the content at the specified URL, and returns it via the specified
 * response.
 * @param {Object} appConfig An object containing application configuration
 * parameters.
 * @param {Object} req The Express request.
 * @param {Object} res The Express response.
 * @param {string} url The URL to fetch.
 */
export default async function rewrite(req, res, url)
{
  const fetchCollator = res.locals.state.fetchCollator;

  const headers = { };

  Object.keys(req.headers)
    .filter(header => header !== 'host')
    .forEach(header => { headers[header] = req.headers[header]; });

  const init = { headers };

  await fetch(url, init).then(
    fetchCollator
      ? onFetchResponseCapture.bind(
          null, fetchCollator, url, init, Date.now())
      : onFetchResponse.bind(null, res));
}
