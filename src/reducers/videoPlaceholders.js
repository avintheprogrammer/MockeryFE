import { VIDEO_PLACEHOLDER_ACTIONS } from '../actions/videoPlaceholderActions';

const {
  SET_ACTIVE_PLACEHOLDER,
  SET_VIDEO,
  SET_LOADING_STATUS,
  SET_XY_POSITION,
  SET_PLAYBACK_POSITION,
  SET_PLAYBACK_STATUS,
  SET_DOCKED
} = VIDEO_PLACEHOLDER_ACTIONS;

const initialState = {
  activeVideoPlaceholderKey: null,
  placeholders: {}
};

const getNewState = (state, action, newProps) => {
  const { placeholders } = state;
  const { videoPlaceholderKey } = action;
  // Get video placeholder
  const oldPlaceholder = placeholders[videoPlaceholderKey] || {};
  // Make a copy and append new props
  const newPlaceholder = Object.assign(
    {},
    oldPlaceholder,
    newProps
  );
  // Make a copy of the main placeholders object
  // and attach new placeholder
  const newPlaceholders = Object.assign(
    {},
    placeholders,
    { [videoPlaceholderKey]: newPlaceholder }
  );

  return { ...state, placeholders: newPlaceholders };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_PLACEHOLDER: {
      const { videoPlaceholderKey } = action;
      return { ...state, activeVideoPlaceholderKey: videoPlaceholderKey };
    }
    case SET_VIDEO: {
      const { video } = action;
      return getNewState(state, action, { video });
    }
    case SET_LOADING_STATUS: {
      const { loadingStatus } = action;
      return getNewState(state, action, { loadingStatus });
    }
    case SET_PLAYBACK_STATUS: {
      const { playbackStatus } = action;
      return getNewState(state, action, { playbackStatus })
    }
    case SET_XY_POSITION: {
      const { xyPosition } = action;
      return getNewState(state, action, { xyPosition });
    }
    case SET_DOCKED: {
      const { docked } = action;
      return getNewState(state, action, { docked });
    }
    case SET_PLAYBACK_POSITION: {
      const { playbackPosition } = action;
      return getNewState(state, action, { playbackPosition });
    }
    default:
      return state;
  }
}
