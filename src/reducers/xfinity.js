import {
  XFINITY_EXPERIENCE
} from '../actions/xfinity';

/**
 * @type {function}
 * Reduces actions related to xfinity and alters state if needed.
 * @param {object} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} An object representing the state of the navigation in the global app state.
 */
export default function xfinity(
  state = {
    isXfinity: false
  },
  action,
) {
  switch (action.type) {
    case XFINITY_EXPERIENCE:
      return Object.assign({}, state, {
        isXfinity: true
      });
    default:
      return state;
  }
}
