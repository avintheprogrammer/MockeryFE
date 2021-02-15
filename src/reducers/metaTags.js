import { SET_ARTICLE_DATA, SET_PAGE_DATA } from '../actions/metaTags';

/**
 * @type {function}
 * Reduces actions related to navigation and alters the state as necessary.
 * @param {string} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} An object representing the state of the navigation in the global app state.
 */
export default function navStatus(
  state = {
    articleData: {},
    pageData: {},
  },
  action,
) {
  switch (action.type) {
    case SET_ARTICLE_DATA:
      return Object.assign({}, state, {
        articleData: action.articleData,
      });
    case SET_PAGE_DATA:
      return Object.assign({}, state, {
        pageData: action.pageData,
      });
    default:
      return state;
  }
}
