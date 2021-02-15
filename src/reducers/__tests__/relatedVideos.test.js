import relatedVideoReducer from '../relatedVideos';
import { relatedVideosActions } from '../../actions/relatedVideosActions';

describe('RelatedVideos reducer', () => {
  // first test for default state
  it('should return the initial state', () => {
    expect(relatedVideoReducer(undefined, {})).toEqual({});
  });

  // test for setting state properties
  it('should handle SET_RELATED_VIDEOS', () => {
    const videos = [1, 2, 3, 4].map((id) => ({ id }));
    const finalState = relatedVideoReducer(undefined, {
      type: relatedVideosActions.SET_RELATED_VIDEOS,
      queryKey: 'myKey',
      videos
    })
    expect(finalState).toEqual({
      myKey: {
        videos,
        status: null,
        error: null
      }
    });
  });

  it('should handle SET_RELATED_VIDEOS_STATE', () => {
    const status = 'somestate';
    const finalState = relatedVideoReducer(undefined, {
      type: relatedVideosActions.SET_RELATED_VIDEOS_STATUS,
      queryKey: 'myKey',
      status
    });
    expect(finalState).toEqual({
      myKey: {
        videos: [],
        status,
        error: null
      }
    });
  });


  it('should handle SET_RELATED_VIDEOS_ERROR', () => {
    const error = new Error('hi');
    const finalState = relatedVideoReducer(undefined, {
      type: relatedVideosActions.SET_RELATED_VIDEOS_ERROR,
      queryKey: 'myKey',
      error
    });
    expect(finalState).toEqual({
      myKey: {
        videos: [],
        status: null,
        error
      }
    });
  });
});
