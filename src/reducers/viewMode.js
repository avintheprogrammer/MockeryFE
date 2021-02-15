import { PAGE_MODE } from '../actions/page';

/**
 * @type {function}
 * Reduces actions related to page mode .
 * @param {object} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} An object representing the state of the navigation in the global app state.
 */
export default function page(
  state = {
    mode: '',
  },
  action,
) {
  switch (action.type) {
    case PAGE_MODE:
      return { mode: action.mode };
    default:
      return state;
  }
}
