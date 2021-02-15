import {
  SELECT_EXCHANGE_NAME,
  INVALIDATE_MARKET_MODULE,
  REQUEST_MARKET_MOVER_DATA,
  RECEIVE_MARKET_MOVER_DATA
} from '../actions/marketMovers';

const DEFAULT_EXCHANGE = 'SP500';

export function selectedExchangeModule(
  state =  DEFAULT_EXCHANGE,
  action,
) {
  switch (action.type) {
    case SELECT_EXCHANGE_NAME:
      return action.exchangeSymbol;
    default:
      return state;
  }
}


function marketMoverData(
  state = {
    isFetching: false,
    didInvalidate: false,
    data: { gainers: [], decliners: [] },
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_MARKET_MODULE:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_MARKET_MOVER_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_MARKET_MOVER_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: {
          gainers: action.marketData.TOP || [],
          decliners: action.marketData.BOTTOM || []
        },
        lastUpdated: action.receivedAt,
        exchangeSymbol: action.exchangeSymbol,
      });
    default:
      return state;
  }
}

export function dataByMarketMover(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_MARKET_MODULE:
    case RECEIVE_MARKET_MOVER_DATA:
    case REQUEST_MARKET_MOVER_DATA:
      return Object.assign({}, state, {
        [action.exchangeSymbol]: marketMoverData(state[action.exchangeSymbol], action),
      });
    case SELECT_EXCHANGE_NAME:
      return Object.assign({}, state, {
      exchangeSymbol: selectedExchangeModule(state, action)
    });
    default:
      return state;
  }
}
