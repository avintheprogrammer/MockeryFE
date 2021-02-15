import { relatedVideosActions } from '../actions/relatedVideosActions';

const {
  SET_RELATED_VIDEOS_STATUS,
  SET_RELATED_VIDEOS,
  SET_RELATED_VIDEOS_ERROR
} = relatedVideosActions;

const initialState = {};

const defaultQueryResult = {
  videos: [],
  status: null,
  error: null
};

function buildState(state, action, newProps) {
  const { queryKey } = action;
  const oldQueryResult = state[queryKey];
  const queryResult = {
    ...defaultQueryResult,
    ...oldQueryResult,
    ...newProps
  };
  return { ...state, [queryKey]: queryResult };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RELATED_VIDEOS_STATUS: {
      const { status } = action;
      return buildState(state, action, { status });
    }
    case SET_RELATED_VIDEOS: {
      const { videos } = action;
      return buildState(state, action, { videos });
    }
    case SET_RELATED_VIDEOS_ERROR: {
      const { error } = action;
      return buildState(state, action, { error });
    }
    default:
      return state;
  }
}
