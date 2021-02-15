/* eslint-disable import/prefer-default-export */

/**
 * Returns an the value of the requested query string parameter
 * @param {String} key The name of the parameter whose value is requested
 * @returns {String}
 */
export function retrieveQsKey(key) {
  const p = escape(unescape(key));
  const regex = new RegExp(`[?&]${p}(?:=([^&]*))?`,"i");
  if (typeof window === 'undefined') { return null }
  const match = regex.exec(window.location.search);
  let value = null;
  if ( match != null ) {
    value = match[1];
  }
  return value;
}
