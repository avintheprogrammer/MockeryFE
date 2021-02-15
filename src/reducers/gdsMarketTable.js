import {
  REQUEST_GDS_MARKET_TABLE_DATA,
  RECEIVE_GDS_MARKET_TABLE_DATA
} from '../actions/gdsMarketTable';

export default function dataByMarketTableData(
  state = {},
  action,
) {
  let updatedMarket;
  switch (action.type) {
    case REQUEST_GDS_MARKET_TABLE_DATA:
      updatedMarket = {
        [action.moduleType]: {
          isFetching: true,
          marketData: [],
        }}
      return Object.assign({}, state, updatedMarket)
    case RECEIVE_GDS_MARKET_TABLE_DATA:
      updatedMarket = {[action.moduleType]: {
        isFetching: false,
        marketData: action.marketData,
        lastUpdated: action.receivedAt}}
      return Object.assign({}, state, updatedMarket);
    default:
      return state;
  }
}
