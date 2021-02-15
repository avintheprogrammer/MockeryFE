/* eslint-disable import/prefer-default-export, consistent-return */

export function isString(object) {
  return typeof object === 'string' || object instanceof String;
}

export function truncateString(string, n, useEllipses = true) {
  if (!string) return '';

  if (useEllipses) {
    if (string.length < n) {
      return string;
    }
    if (string.length > n) {
      const returnString = string.substring(0, n + 1);
      return `${returnString.substring(0, Math.min(returnString.length, returnString.lastIndexOf(" ")))}...`;
    }
  }

  return string.substr(0, n);
}
