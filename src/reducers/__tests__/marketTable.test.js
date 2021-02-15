import dataByMarketTableData from '../marketTable';
import {
  REQUEST_MARKET_TABLE_DATA,
  RECEIVE_MARKET_TABLE_DATA,
} from '../../actions/marketTable';

describe('data by market active reducer', () => {
  it('should return the initial state', () => {
    expect(dataByMarketTableData(undefined, {})).toEqual({});
  });

  it('should handle REQUEST_MARKET_TABLE_DATA', () => {
    expect(
      dataByMarketTableData(undefined, {
        type: REQUEST_MARKET_TABLE_DATA,
        market: 'market',
      }),
    ).toEqual({
      'market' : {
        marketData: [],
        didInvalidate: false,
        isFetching: true,}
    });
  });

  it('should handle RECEIVE_MARKET_TABLE_DATA', () => {
    expect(
      dataByMarketTableData(undefined, {
        type: RECEIVE_MARKET_TABLE_DATA,
        marketData: ['data'],
        receivedAt: '',
        market: 'market',
      }),
    ).toEqual({
      'market': {
        isFetching: false,
        marketData: ['data'],
        didInvalidate: false,
        lastUpdated: '',
      }
    });
  });

});
