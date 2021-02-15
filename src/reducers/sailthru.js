import {
  SAILTHRU_LOADED
} from '../actions/sailthruActions';

/**
 * @type {function}
 * Reduces actions related to xfinity and alters state if needed.
 * @param {object} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} An object representing the state of the navigation in the global app state.
 */
export default function sailthru(
  state = {
    sailthruLoaded: false
  },
  action,
) {
  switch (action.type) {
    case SAILTHRU_LOADED:
      return {
        ...state,
        sailthruLoaded: true,
      };
    default:
      return state;
  }
}
