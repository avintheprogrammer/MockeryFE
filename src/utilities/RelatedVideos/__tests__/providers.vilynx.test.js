import { getVilynxRecommendations, getVideosFromIds, getRecommendations } from '../providers/vilynx';
import query from '../queries/videos';

const mockRawVilynxResults = [
  '123',
  '345',
  '678'
];
const mockVilynxClient = {
  /* eslint-disable-next-line no-unused-vars */
  get: jest.fn((url, callback, config) => {
    callback(mockRawVilynxResults);
  })
}
const mockVilynxResults = [
  123, 345, 678
];
const mockVideoResults = mockVilynxResults.map((id) => ({ id }));
const mockGqlResponse = {
  data: {
    videos: mockVideoResults
  }
};
const mockGqlClient = {
  query: jest.fn().mockReturnValue(Promise.resolve(mockGqlResponse))
}

describe('RelatedVideos vilynx provider', () => {
  it('getVilynxRecommendations() calls vilynx client and returns list of numeric ids', () => {
    const url = 'http://google.com';
    const expectedConfig = {
      limit: 10,
      type: ['video'],
      retrieveguid: true
    };

    expect.assertions(2);
    return getVilynxRecommendations(url, 10, mockVilynxClient).then((recs) => {
      expect(mockVilynxClient.get).toBeCalledWith(url, expect.any(Function), expectedConfig);
      expect(recs).toEqual(mockVilynxResults);
    });
  });

  it('getVideosFromIds() executes query and returns results', () => {
    const ids = mockVilynxResults;
    expect.assertions(2);
    return getVideosFromIds(ids, mockGqlClient).then((results) => {
      expect(mockGqlClient.query).toBeCalledWith({
        query,
        variables: {
          ids
        },
        fetchPolicy: 'network-only'
      });
      expect(results).toEqual(mockVideoResults);
    });
  });

  // This is just a smoke test
  it('getRecommendations() returns results of gqlClient query', () => {
    const url = 'http://google.com';
    const mockGetVilynxClient = () => (
      Promise.resolve(mockVilynxClient)
    );
    expect.assertions(1);
    return getRecommendations(
      { url, count: 10 },
      { gqlClient: mockGqlClient },
      mockGetVilynxClient,
    ).then((res) => {
      expect(res).toEqual(mockVideoResults);
    });
  });
});
