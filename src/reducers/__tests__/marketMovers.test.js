import {selectedExchangeModule, dataByMarketMover } from '../marketMovers';
import {
  SELECT_MARKET_MODULE,
  REQUEST_MARKET_MOVER_DATA,
  RECEIVE_MARKET_MOVER_DATA,
} from '../../actions/marketMovers';

describe('data by market movers reducer', () => {
  it('should return the initial state', () => {
    expect(dataByMarketMover(undefined, {})).toEqual({});
  });

  it('should handle REQUEST_MARKET_MOVER_DATA', () => {
    expect(
      dataByMarketMover(undefined, {
        type: REQUEST_MARKET_MOVER_DATA,
        exchangeSymbol: 'SP500'
      }),
    ).toEqual({'SP500': {
      data: {decliners: [], gainers: []},
      didInvalidate: false,
      isFetching: true,
    }});
  });

  it('should handle RECEIVE_MARKET_MOVER_DATA', () => {
    expect(
      dataByMarketMover(undefined, {
        type: RECEIVE_MARKET_MOVER_DATA,
        marketData: [],
        receivedAt: '',
        exchangeSymbol: 'SP500',
      }),
    ).toEqual({'SP500': {
      isFetching: false,
      didInvalidate: false,
      data: {decliners: [], gainers: []},
      lastUpdated: '',
      exchangeSymbol: 'SP500',
    }});
  });

  it('should handle SELECT_EXCHANGE_MODULE', () => {
    expect(
      selectedExchangeModule(undefined, {
        type: SELECT_MARKET_MODULE,
        exchangeSymbol: 'SP500',
      }),
    ).toEqual('SP500');
  });
});
