import dataByQuote from '../quotes';
import {
  REQUEST_QUOTE_DATA,
  RECEIVE_QUOTE_DATA,
  INVALIDATE_QUOTE_DATA,
} from '../../actions/quotes';

describe('quotes reducer', () => {
  it('should return the initial state', () => {
    expect(dataByQuote(undefined, {})).toEqual({});
  });

  it('should handle INVALIDATE_QUOTE_DATA', () => {
    expect(
      dataByQuote(undefined, {
        type: INVALIDATE_QUOTE_DATA,
        market: 'GOOG',
      }),
    ).toEqual({
      GOOG: {
        didInvalidate: true,
      },
    });
  });

  it('should handle REQUEST_QUOTE_DATA', () => {
    expect(
      dataByQuote(undefined, {
        type: REQUEST_QUOTE_DATA,
        market: 'GOOG',
      }),
    ).toEqual({
      GOOG: {
        didInvalidate: false,
        isFetching: true,
      },
    });
  });

  it('should handle RECEIVE_QUOTE_DATA', () => {
    expect(
      dataByQuote(undefined, {
        type: RECEIVE_QUOTE_DATA,
        market: 'GOOG',
        marketData: {},
        receivedAt: '',
      }),
    ).toEqual({
      GOOG: {
        isFetching: false,
        didInvalidate: false,
        marketData: {},
        lastUpdated: '',
      },
    });
  });
});
