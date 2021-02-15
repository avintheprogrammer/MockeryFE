import {
  SELECT_MARKET_BANNER,
  INVALIDATE_MARKET_BANNER,
  REQUEST_MARKET_BANNER_DATA,
  RECEIVE_MARKET_BANNER_DATA,
} from '../actions/marketsBanner';

/**
 * @type {function}
 * Reduces actions related to market selection and alters the state as necessary.
 * @param {string} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {string} A string representing the currently selected market in the app state.
 */
export function selectedMarketBanner(state = '', action) {
  switch (action.type) {
    case SELECT_MARKET_BANNER:
      return action.market;
    default:
      return state;
  }
}

/**
 * @type {function}
 * Reduces actions related to requesting and receiving market data and alters the state as necessary.
 * @param {object} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} A object representing the part of the global state relating to fetching new market data.
 */
export function marketBannerData(
  state = {
    isFetching: false,
    didInvalidate: false,
    data: [],
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_MARKET_BANNER:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_MARKET_BANNER_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_MARKET_BANNER_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.marketData,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

/**
 * @type {function}
 * Reduces actions related to requesting market data and assigning to the selected market.
 * @param {object} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} A object representing the part of the global state relating to market data organized per market.
 */
export function dataByMarketBanner(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_MARKET_BANNER:
    case RECEIVE_MARKET_BANNER_DATA:
    case REQUEST_MARKET_BANNER_DATA:
      return Object.assign({}, state, {
        [action.market]: marketBannerData(state[action.market], action),
      });
    default:
      return state;
  }
}
