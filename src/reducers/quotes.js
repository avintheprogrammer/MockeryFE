/* eslint-disable no-return-assign, no-useless-return, consistent-return, no-case-declarations */
import {
  REQUEST_QUOTE_DATA,
  RECEIVE_QUOTE_DATA,
  INVALIDATE_QUOTE_DATA,
  RECEIVE_BATCHED_QUOTE_DATA,
  INVALIDATE_BATCHED_QUOTE_DATA,
} from '../actions/quotes';

/**
 * @type {function}
 * Reduces actions related to requesting and receiving quote data and alters the state as necessary.
 * @param {object} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} A object representing the part of the global state relating to fetching new quote data.
 */
export default function dataByQuote(state = {}, action) {
  let updatedQuote;
  switch (action.type) {
    case INVALIDATE_QUOTE_DATA:
      updatedQuote = {
        [action.market]: {
          ...state[action.market],
          didInvalidate: true,
        },
      };
      return Object.assign({}, state, updatedQuote);
    case INVALIDATE_BATCHED_QUOTE_DATA:
      const tickers = action.market.split('|').filter(item => item.length > 0);
      updatedQuote = state;
      // Map over all tickers, set didInvalidate to true
      tickers.map(ticker => {
        if (updatedQuote[ticker]) {
          return (updatedQuote[ticker].didInvalidate = true);
        }
        return '';
      });
      return updatedQuote;
    case REQUEST_QUOTE_DATA:
      updatedQuote = {
        [action.market]: {
          ...state[action.market],
          isFetching: true,
          didInvalidate: false,
        },
      };
      return Object.assign({}, state, updatedQuote);
    case RECEIVE_QUOTE_DATA:
      updatedQuote = {
        [action.market]: {
          isFetching: false,
          didInvalidate: false,
          marketData: action.marketData,
          lastUpdated: action.receivedAt,
        },
      };
      return Object.assign({}, state, updatedQuote);
    case RECEIVE_BATCHED_QUOTE_DATA:
      updatedQuote = {};
      const { marketData, tickerProperty, receivedAt } = action;

      marketData.map(
        market =>
          (updatedQuote[market[tickerProperty]] = {
            isFetching: false,
            didInvalidate: false,
            marketData: market,
            lastUpdated: receivedAt,
          }),
      );
      return Object.assign({}, state, updatedQuote);
    default:
      return state;
  }
}
