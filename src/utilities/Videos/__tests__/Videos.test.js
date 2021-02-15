import query from '../query';
import { loadVideoById } from '../index';

describe('Videos utility', () => {
  it('loadVideoById() calls gql for video', () => {
    const video = {
      id: 123,
      my: 'video'
    };
    const gqlClient = {
      query: jest.fn().mockReturnValue(Promise.resolve({
        data: {
          video
        }
      }))
    };

    expect.assertions(2);
    return loadVideoById(123, gqlClient).then((resultVideo) => {
      const expectedParams = {
        query,
        variables: {
          videoId: 123
        },
        fetchPolicy: 'network-only'
      }
      expect(gqlClient.query).toBeCalledWith(expectedParams);
      expect(video).toEqual(resultVideo);
    });
  });
});
