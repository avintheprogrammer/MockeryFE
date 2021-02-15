/**
 * A class that represents that the normal page rendering flow should be
 * interrupted, and the app should instead retrieve and present content from
 * the source designated in the specified URL.
 * @augments {CustomError}
 */
class RewriteSignal
{
  /**
   * Create a <code>RewriteSignal</code>.
   * @param {string} url The URL that should be retrieved and presented instead
   * of the current content.
   * @param {number} httpStatus An optional HTTP status to return for the
   * current request.
   * @param {boolean} isInternal True if the rewrite should be handled
   * internally by passing the new URL to the existing Express app.
   */
  constructor(url, httpStatus = null, isInternal = false)
  {
    this.url = url;
    this.httpStatus = httpStatus;
    this.isInternal = isInternal;
  }
}

export default RewriteSignal;

