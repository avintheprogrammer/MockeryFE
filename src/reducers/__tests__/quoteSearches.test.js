import quoteSearches from '../quoteSearches';
import { ADD_QUOTE_SEARCH } from '../../actions/quoteSearches';

describe('quoteSearches reducer', () => {
  it('should return the initial state', () => {
    expect(quoteSearches(undefined, {})).toEqual([]);
  });

  it('should handle ADD_QUOTE_SEARCH', () => {
    expect(
      quoteSearches(undefined, {
        type: ADD_QUOTE_SEARCH,
        quote: 'QUOTE!',
      }),
    ).toEqual(['QUOTE!'])
  });

  it('should restrict the number of quotes', () => {
    expect(
      quoteSearches(['QUOTE2', 'QUOTE1', 'QUOTE0'], {
        type: ADD_QUOTE_SEARCH,
        quote: 'QUOTE3',
      }),
    ).toEqual(['QUOTE3', 'QUOTE2', 'QUOTE1'])
  });
});
