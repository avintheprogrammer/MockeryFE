import {
  SET_NAV_PAGE_TYPE,
  SET_NAV_ARTICLE_TITLE,
  SET_NAV_ARTICLE_SETTINGS,
  SET_NAV_NEWS,
  SET_NAV_LIVE,
  SET_NAV_COUNT_DOWN_CLOCK,
  SET_MEGA_MENU_EXPANDED_FLAG,
  SET_MEGA_MENU_TOGGLE_FLAG,
  SET_INTRA_NAVIGATION_FLAG,
} from '../actions/navStatus';

/**
 * @type {constant}
 * @type {string} The default page type in case none are provided.
 */
const DEFAULT_PAGE_TYPE = 'page';

/**
 * @type {function}
 * Reduces actions related to navigation and alters the state as necessary.
 * @param {string} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} An object representing the state of the navigation in the global app state.
 */
export default function navStatus(
  state = {
    pageType: DEFAULT_PAGE_TYPE,
    articleTitle: '',
    hasNewsAlert: false,
    hasLiveAlert: false,
    hasCountDownClock: false,
    articleSettings: {},
    megaMenuToggleFlag: false,
    isExpanded: false,
    isIntraSiteLink: false,
  },
  action,
) {
  switch (action.type) {
    case SET_NAV_PAGE_TYPE:
      return Object.assign({}, state, {
        pageType: action.pageType,
      });
    case SET_NAV_ARTICLE_TITLE:
      return Object.assign({}, state, {
        articleTitle: action.articleTitle,
      });
    case SET_NAV_NEWS:
      return Object.assign({}, state, {
        hasNewsAlert: action.hasNewsAlert,
      });
    case SET_NAV_LIVE:
      return Object.assign({}, state, {
        hasLiveAlert: action.hasLiveAlert,
      });
    case SET_NAV_COUNT_DOWN_CLOCK:
      return Object.assign({}, state, {
        hasCountDownClock: action.hasCountDownClock,
      });
    case SET_NAV_ARTICLE_SETTINGS:
      return Object.assign({}, state, {
        articleSettings: action.articleSettings,
      });
    case SET_MEGA_MENU_TOGGLE_FLAG:
    return Object.assign({}, state, {
      megaMenuToggleFlag: action.shouldToggle,
    });
    case SET_MEGA_MENU_EXPANDED_FLAG:
    return Object.assign({}, state, {
      isExpanded: action.isExpanded,
    });
    case SET_INTRA_NAVIGATION_FLAG:
    return Object.assign({}, state, {
      isIntraSiteLink: action.isIntraSiteLink,
    });
    default:
      return state;
  }
}
