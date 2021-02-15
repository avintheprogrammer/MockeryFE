import {
  REQUEST_MARKET_TABLE_DATA,
  RECEIVE_MARKET_TABLE_DATA,
  INVALIDATE_MARKET_TABLE_DATA,
} from '../actions/marketTable';

export default function dataByMarketTableData(
  state = {},
  action,
) {
  let updatedMarket;
  switch (action.type) {
    case INVALIDATE_MARKET_TABLE_DATA:
      updatedMarket = {
        [action.market]: {
          didInvalidate: true,
        }
      }
      return Object.assign({}, state, updatedMarket)
    case REQUEST_MARKET_TABLE_DATA:
      updatedMarket = {
        [action.market]: {
          isFetching: true,
          marketData: [],
          didInvalidate:false,
        }}
      return Object.assign({}, state, updatedMarket)
    case RECEIVE_MARKET_TABLE_DATA:
      updatedMarket = {[action.market]: {
        isFetching: false,
        didInvalidate: false,
        marketData: action.marketData,
        lastUpdated: action.receivedAt}}
      return Object.assign({}, state, updatedMarket);
    default:
      return state;
  }
}
