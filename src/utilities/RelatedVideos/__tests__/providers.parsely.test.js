import { getRecommendations } from '../providers/parsely';
import query from '../queries/videoRecommendations';

describe('RelatedVideos parsely provider getRecommendation()', () => {
  it('makes a GraphQl query to retrieve recommendations', () => {
    const gqlClient = {
      query: jest.fn().mockReturnValue(Promise.resolve({
        data: {
          videoRecommendations: []
        }
      }))
    };

    expect.assertions(1);
    return getRecommendations(
      { id: 123, count: 10, url: 'http://google.com' },
      { gqlClient }
    ).then(() => {
      const expectParams = {
        query,
        variables: {
          id: 123,
          count: 10,
          url: 'http://google.com',
        },
        fetchPolicy: 'network-only',
      };
      expect(gqlClient.query).toBeCalledWith(expectParams);
    });
  });
});
