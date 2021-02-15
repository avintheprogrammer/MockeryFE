import CustomError from '../lib/error/CustomError';
import AppRequestError from '../lib/error/AppRequestError';
import ApolloRequestError from './ApolloRequestError';

/**
 * Returns an error message based on the specified number of errors.
 * @param {number} count The specified number of errors.
 * @returns {string} An error message based on the specified number of
 * errors.
 */
function constructPluralMessage(count)
{
  const plural = count === 1 ? '' : 's';

  return count
    ? `Errors occurred for ${count} Apollo operation${plural}`
    : null;
}

/**
 * A class that represents one or more errors that occurred for one or more
 * GraphQL requests that were initiated to serve an incoming web site page
 * request.
 * @augments {AppRequestError}
 */
class RenderErrorList extends AppRequestError
{
  /**
   * @constructor
   * Create an <code>RenderErrorList</code>.
   * @param {Error[]} errors An array of zero or more <code>Error</code>
   * objects that occurred for one or more GraphQL requests that were initiated
   * to serve an incoming web site page request.
   */
  constructor(errors = [ ])
  {
    const thisErrors = errors instanceof Array ? errors : [ errors ];
    super(constructPluralMessage(thisErrors.length));
    this.errors = thisErrors;
  }

  /**
   * Adds the specified <code>Error</code> to the collection of errors that
   * occurred for one or more GraphQL requests that were initiated to serve an
   * incoming web site page request.
   * @param {Error} err The error to add to the collection.
   */
  add(err)
  {
    this.errors.push(err);
    this.message = constructPluralMessage(this.errors.length);
    return this;
  }

  /**
   * If the specified <code>Error</code> does not already existing within the
   * collection of errors that occurred for one or more GraphQL requests that
   * were initiated to serve an incoming web site page request, add it.
   * @param {error} err The error to add to the collection, if unique.
   */
  addUnique(err)
  {
    if (!this.hasError(err))
    {
      this.add(err);
    }
    return this;
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

    const { message, errors } = this;

    if (message)
    {
      digest.push(message);
    }

    const apolloErrors = (errors || [ ]).map(err =>
    {
      const error = (err instanceof CustomError
        ? err : new CustomError(err).useStack(showTrace))
        .getAsObject(showTrace);

      const errorDigest = [ ];

      if (error.HASH)
      {
        errorDigest.push(error.HASH);
      }
      else if (error.MESSAGE)
      {
        errorDigest.push(error.MESSAGE);
      }
      if (errorDigest.length) {
        digest.push(CustomError.getHashDigest(JSON.stringify(errorDigest)));
      }
      return error;
    });

    if (apolloErrors.length) {
      if (digest.length) {
        object.HASH = CustomError.getHashDigest(JSON.stringify(digest));
      }
      object['APOLLO ERRORS'] = apolloErrors;
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

    const n = (this.errors || [ ]).length;
    let i;

    for (i = 0; i < n; i += 1)
    {
      const compare = this.errors[i];
      if (err === compare) {
        return true;
      }
      if ((compare instanceof ApolloRequestError) && compare.hasError(err))
      {
        return true;
      }
    }
    return false;
  }
}

export default RenderErrorList;
