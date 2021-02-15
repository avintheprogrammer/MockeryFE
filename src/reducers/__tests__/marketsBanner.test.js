import {selectedMarketBanner, marketBannerData } from '../marketsBanner';
import {
  SELECT_MARKET_BANNER,
  INVALIDATE_MARKET_BANNER,
  REQUEST_MARKET_BANNER_DATA,
  RECEIVE_MARKET_BANNER_DATA,
} from '../../actions/marketsBanner';

describe('markets reducer', () => {
  it('should return the initial state', () => {
    expect(marketBannerData(undefined, {})).toEqual({
      isFetching: false,
      didInvalidate: false,
      data: [],
    });
  });

  it('should handle INVALIDATE_MARKET_BANNER', () => {
    expect(
      marketBannerData(undefined, {
        type: INVALIDATE_MARKET_BANNER,
      }),
    ).toEqual({
      data: [],
      didInvalidate: true,
      isFetching: false,
    });
  });

  it('should handle REQUEST_MARKET_BANNER_DATA', () => {
    expect(
      marketBannerData(undefined, {
        type: REQUEST_MARKET_BANNER_DATA,
      }),
    ).toEqual({
      data: [],
      didInvalidate: false,
      isFetching: true,
    });
  });

  it('should handle RECEIVE_MARKET_BANNER_DATA', () => {
    expect(
      marketBannerData(undefined, {
        type: RECEIVE_MARKET_BANNER_DATA,
        marketData: {},
        receivedAt: '',
      }),
    ).toEqual({
      isFetching: false,
      didInvalidate: false,
      data: {},
      lastUpdated: '',
    });
  });

  it('should handle SELECT_MARKET_BANNER', () => {
    expect(
      selectedMarketBanner([], {
        type: SELECT_MARKET_BANNER,
        market: 'usa',
      }),
    ).toEqual('usa');
  });
});
