/* eslint-disable import/prefer-default-export */

/**
 * @type {function}
 * Returns the DOM element over which the player should be positioned
 * @param {string} placeholderId - the ID of the Video Placeholder element
 * @param {boolean} usePlaceholder - whether to return the placeholder or the descendant mediaContainer element
 * @returns {object} - DOM element
 */
export function getPositioningElement(placeholderId, usePlaceholder) {
  const useMediaContainerInstead = !usePlaceholder;
  const placeholderElement = document.getElementById(placeholderId);
  if (useMediaContainerInstead) {
    const mediaContainerElement = placeholderElement.querySelectorAll('div[class*="mediaContainer"]')[0];
    return mediaContainerElement;
  }
  return placeholderElement;
}
