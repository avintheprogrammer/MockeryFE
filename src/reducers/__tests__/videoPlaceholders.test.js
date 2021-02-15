import videoPlaceholdersReducer from '../videoPlaceholders';
import { VIDEO_PLACEHOLDER_ACTIONS } from '../../actions/videoPlaceholderActions';

const {
  SET_ACTIVE_PLACEHOLDER,
  SET_VIDEO,
  SET_LOADING_STATUS,
  SET_XY_POSITION,
  SET_PLAYBACK_POSITION,
  SET_PLAYBACK_STATUS,
} = VIDEO_PLACEHOLDER_ACTIONS;

describe('VideoPlaceholders reducer', () => {
  // first test for default state
  it('should return the initial state', () => {
    expect(videoPlaceholdersReducer(undefined, {})).toEqual({
      activeVideoPlaceholderKey: null,
      placeholders: {}
    });
  });

  // setting a new active VideoPlaceholder
  it('should handle SET_ACTIVE_PLACEHOLDER', () => {
    const finalState = videoPlaceholdersReducer(undefined, {
      type: SET_ACTIVE_PLACEHOLDER,
      videoPlaceholderKey: 'mykey'
    })
    expect(finalState).toEqual({
      activeVideoPlaceholderKey: 'mykey',
      placeholders: {}
    });
  });

  // setting a new video
  it('should handle SET_VIDEO', () => {
    const video = {
      id: 123,
      my: 'video'
    };
    const finalState = videoPlaceholdersReducer(undefined, {
      type: SET_VIDEO,
      videoPlaceholderKey: 'mykey',
      video
    });
    expect(finalState).toEqual({
      activeVideoPlaceholderKey: null,
      placeholders: {
        mykey: {
          video
        }
      }
    });
  });

  // setting loading status
  it('should handle SET_LOADING_STATUS', () => {
    const loadingStatus = 'somestatus';
    const finalState = videoPlaceholdersReducer(undefined, {
      type: SET_LOADING_STATUS,
      videoPlaceholderKey: 'mykey',
      loadingStatus
    });
    expect(finalState).toEqual({
      activeVideoPlaceholderKey: null,
      placeholders: {
        mykey: {
          loadingStatus
        }
      }
    });
  });

  // setting xyPosition
  it('should handle SET_XY_POSITION', () => {
    const xyPosition = {
      bottom:1,
      left:2,
      width:3,
      height:4
    };
    const finalState = videoPlaceholdersReducer(undefined, {
      type: SET_XY_POSITION,
      videoPlaceholderKey: 'mykey',
      xyPosition
    });
    expect(finalState).toEqual({
      activeVideoPlaceholderKey: null,
      placeholders: {
        mykey: {
          xyPosition
        }
      }
    });
  });

  it('should handle SET_PLAYBACK_POSITION', () => {
    const playbackPosition = 500;
    const finalState = videoPlaceholdersReducer(undefined, {
      type: SET_PLAYBACK_POSITION,
      videoPlaceholderKey: 'mykey',
      playbackPosition
    });
    expect(finalState).toEqual({
      activeVideoPlaceholderKey: null,
      placeholders: {
        mykey: {
          playbackPosition
        }
      }
    });
  });

  it('should handle SET_PLAYBACK_STATUS', () => {
    const playbackStatus = 'complete';
    const finalState = videoPlaceholdersReducer(undefined, {
      type: SET_PLAYBACK_STATUS,
      videoPlaceholderKey: 'mykey',
      playbackStatus
    });
    expect(finalState).toEqual({
      activeVideoPlaceholderKey: null,
      placeholders: {
        mykey: {
          playbackStatus
        }
      }
    });
  });

  it('should handle SET_DOCKED', () => {
    const docked = false;
    const finalState = videoPlaceholdersReducer(undefined, {
      type: VIDEO_PLACEHOLDER_ACTIONS.SET_DOCKED,
      videoPlaceholderKey: 'mykey',
      docked
    });
    expect(finalState).toEqual({
      activeVideoPlaceholderKey: null,
      placeholders: {
        mykey: {
          docked
        }
      }
    });
  });

  it('can non-destructively set placholder props', () => {
    const video = { id: 123, my: 'video' };
    const playbackPosition = 500;
    const videoPlaceholderKey = 'activeKey';
    const xyPosition = { bottom: 1, left: 1, width: 1, height: 1 };
    let state = videoPlaceholdersReducer(undefined, {
      type: VIDEO_PLACEHOLDER_ACTIONS.SET_ACTIVE_PLACEHOLDER,
      videoPlaceholderKey
    });
    state = videoPlaceholdersReducer(state, {
      type: VIDEO_PLACEHOLDER_ACTIONS.SET_VIDEO,
      videoPlaceholderKey,
      video
    });
    state = videoPlaceholdersReducer(state, {
      type: VIDEO_PLACEHOLDER_ACTIONS.SET_PLAYBACK_POSITION,
      videoPlaceholderKey,
      playbackPosition
    });
    state = videoPlaceholdersReducer(state, {
      type: VIDEO_PLACEHOLDER_ACTIONS.SET_XY_POSITION,
      videoPlaceholderKey,
      xyPosition
    });
    expect(state).toEqual({
      activeVideoPlaceholderKey: 'activeKey',
      placeholders: {
        activeKey: {
          video,
          playbackPosition,
          xyPosition
        }
      }
    });
  })
});
