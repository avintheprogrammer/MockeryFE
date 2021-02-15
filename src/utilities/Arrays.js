/* eslint-disable import/prefer-default-export */

/**
 * @type {function}
 * Flattens a nested array of arrays into a single-level deep array.
 * @param {array} arr Array containing nested arrays.
 * @returns {array} A single-deep array of values.
 */
export function flattenDeep(arr) {
  return arr.reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flattenDeep(toFlatten) : toFlatten),
    [],
  );
}

/**
 * @type {function}
 * Removes duplicates from array.
 * @param {array} arr Array.
 * @returns {array} A array with unique values.
 */
export function removeDuplicates(arr) {
  return [...(new Set(arr))];
}

export function findId(arr = []) {
  return (arr.find((data = {}) => data.id && data.id !== "") || {}).id;
}
