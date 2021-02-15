import CustomError from '../lib/error/CustomError';

/**
 * A class that represents one or more errors that occur for a GraphQL
 * request.
 * @augments {CustomError}
 */
class ApolloRequestError extends CustomError
{
  /**
   * @constructor
   * Create an <code>ApolloRequestError</code>.
   * @param {ApolloError|ErrorHandler} err An <code>ApolloError</code> or
   * <code>ErrorHandler</code> object that my contain properties 'operation',
   * 'networkError', 'graphQLErrors', and 'message'.
   */
  constructor(err)
  {
    const { networkError, graphQLErrors, message, operation } = err || { };

    super();
    this.originalError = err;
    this.operation = operation ||
      (networkError ? networkError.operation : null);
    this.networkError = networkError;
    this.graphQLErrors = graphQLErrors;
    this.message = message;
  }

  /**
   * Returns an object representation of the error condition.
   * @param {boolean} showTrace An optional flag the specifies whether the
   * formatted output should contain an error stack trace.
   * @returns {Object} An object representation of the error condition.
   */
  getAsObject(showTrace = this.isStackEnabled())
  {
    const object = super.getAsObject(showTrace);
    const digest = [ ];

    const { operation, networkError, graphQLErrors } = this;
    const { operationName, variables: operationVariables } = operation || { };
    const context = operation && operation.getContext &&
      operation.getContext();
    const response = (context && context.response) ||
      (networkError && networkError.response);
    const { url, headers, status, statusText } = response || { };

    const requestFields = { };

    if (url && url.href) {
      requestFields.URL = url.href;
    }
    if (operationName) {
      requestFields.OPERATION = operationName;
      digest.push(operationName);
    }
    if (operationVariables) {
      requestFields.VARIABLES = operationVariables;
      digest.push(operationVariables);
    }
    if (Object.keys(requestFields).length) {
      object.REQUEST = requestFields;
    }

    const responseFields = { };

    if (status) {
      const statusValues = [ status ];
      if (statusText) {
        statusValues.push(statusText);
      }
      responseFields.STATUS = statusValues.join(' ');
    }

    if (headers)
    {
      const rawHeaders = typeof headers.raw === 'function' ? headers.raw() : headers;
      const headerFields = { };

      if (rawHeaders.date) {
        headerFields.DATE = rawHeaders.date;
      }
      if (rawHeaders['content-type']) {
        headerFields['CONTENT TYPE'] = rawHeaders['content-type'];
      }
      if (rawHeaders['access-control-allow-origin']) {
        headerFields['ALLOW ORIGIN'] =
          rawHeaders['access-control-allow-origin'];
      }
      if (rawHeaders['x-aicache-os']) {
        headerFields['AICACHE OS'] = rawHeaders['x-aicache-os'];
      }
      if (Object.keys(headerFields).length) {
        responseFields.HEADERS = headerFields;
      }
    }

    if (Object.keys(responseFields).length) {
      object.RESPONSE = responseFields;
    }

    const errorFields = { };

    if (networkError)
    {
      let networkErrorFields = { };
      const networkErrorDigest = [ ];

      if (networkError instanceof CustomError)
      {
        networkErrorFields = networkError.getAsObject(showTrace);
        if (networkErrorFields.HASH)
        {
          networkErrorDigest.push(networkErrorFields.HASH);
        }
        else if (networkErrorFields.MESSAGE)
        {
          networkErrorDigest.push(networkErrorFields.MESSAGE);
        }
      } else {
        if ('message' in networkError) {
          networkErrorFields.MESSAGE = networkError.message;
          networkErrorDigest.push(networkError.message);
        }
        if ('stack' in networkError) {
          const trace = String(networkError.stack).split(/\s*\n\s*/);
          networkErrorFields.TRACE =
            trace.length > 1 ? trace : networkError.stack;
        }
        if (!networkErrorFields.length) {
          networkErrorFields.MESSAGE = String(networkError);
          networkErrorDigest.push(networkErrorFields.MESSAGE);
        }
      }
      if (Object.keys(networkErrorFields).length) {
        if (networkErrorDigest.length) {
          networkErrorFields.HASH = CustomError.getHashDigest(
            JSON.stringify(networkErrorDigest));
          digest.push(networkErrorFields.HASH);
        }
        errorFields['NETWORK ERROR'] = networkErrorFields;
      }
    }

    const graphQlErrorList = [ ];

    (graphQLErrors || [ ]).forEach(value =>
    {
      const graphQlErrorFields = { };
      const graphQlDigest = [ ];

      const { message: graphQlMessage, locations, path } = value;

      if (graphQlMessage) {
        graphQlErrorFields.MESSAGE = graphQlMessage;
        graphQlDigest.push(graphQlMessage);
      }
      if (locations) {
        graphQlErrorFields.LOCATION = locations;
        graphQlDigest.push(locations);
      }
      if (path) {
        graphQlErrorFields.PATH = path;
        graphQlDigest.push(path);
      }
      if (Object.keys(graphQlErrorFields).length)
      {
        if (graphQlDigest.length)
        {
          graphQlErrorFields.HASH = CustomError.getHashDigest(
            JSON.stringify(graphQlDigest));
          digest.push(graphQlErrorFields.HASH);
          graphQlErrorList.push(graphQlErrorFields);
        }
      }
    });

    if (graphQlErrorList.length) {
      errorFields['GRAPHQL ERRORS'] = graphQlErrorList;
    }

    if (Object.keys(errorFields).length) {
      object.ERRORS = errorFields;
    }

    if (digest.length) {
      object.HASH = CustomError.getHashDigest(JSON.stringify(digest));
    }
    return object;
  }

  /**
   * Returns true if the specified object is already contained within the
   * error collections of this object.
   * @param {Error} err The error object to seek.
   * @returns {boolean} True if the specified object is already contained
   * within the error collections of this object.
   */
  hasError(err)
  {
    if (!err) {
      return false;
    }

    const { originalError, networkError, graphQLErrors } = this;

    if ((err === originalError) || (err === networkError)) {
      return true;
    }

    const n = (graphQLErrors || [ ]).length;
    let i;

    for (i = 0; i < n; i += 1)
    {
      if (err === graphQLErrors[i]) {
        return true;
      }
    }
    return false;
  }
}

export default ApolloRequestError;
