/**
 * A class that represents that the normal page rendering flow should be
 * interrupted, and the app should instead redirect and present content from
 * the source designated in the specified URL.
 * @augments {CustomError}
 */
class RedirectSignal
{
  /**
   * Create a <code>RedirectSignal</code>.
   * @param {string} url The URL that should be redirected to and presented instead
   * of the current url.
   */
  constructor(url)
  {
    this.url = url;
  }
}

export default RedirectSignal;
