/* eslint-disable import/prefer-default-export */

export function containsValue({ obj = {}, value = '' }) {
  return Object.values(obj).find(row => row === value);
}

/**
 * @type {function}
 * Looks through the object of react children to check if there are any non-media text elements to display.
 * @param {object} item Object of react elements returned from the toJSX function.
 * @returns {array} Arrays with true/false values depending on whether there is valid content.
 */
export function checkForTextContent(item) {
  // If no children or no item, return null.
  if (
    !item ||
    !item.props ||
    !item.props.children ||
    !item.props.children.length ||
    item.props.children.length <= 0
  ) {
    return null;
  }

  // If there is a text node, return true.
  if (item.props.children.length === 1 && typeof item.props.children[0] === 'string') {
    return true;
  }

  // Otherwise check further down into the children.
  return item.props.children.map(child => checkForTextContent(child));
}
