import { ADD_QUOTE_SEARCH } from '../actions/quoteSearches';

/**
 * @type {function}
 * Reduces actions related to navigation and alters the state as necessary.
 * @param {string} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} An object representing the state of the navigation in the global app state.
 */
export default function quoteSearches(
  state = [],
  action,
) {
  const newState = state;
  switch (action.type) {
    case ADD_QUOTE_SEARCH:
      // Add the new quote
      newState.unshift(action.quote.toUpperCase());
      if (state.length > 3){
        // Remove the oldest quote
        newState.pop();
      }
      return newState;
    default:
      return state;
  }
}
