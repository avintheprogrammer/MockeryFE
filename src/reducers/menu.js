/* eslint-disable no-case-declarations */
import {
  FETCH_MENU_START,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_ERROR,
} from '../actions/menu';

/**
 * @type {function}
 * Reduces actions related to xfinity and alters state if needed.
 * @param {object} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} An object representing the state of the navigation in the global app state.
 */
export default function menu(
  state = {
    loading: false,
    menu: null,
    errors: null,
  },
  action,
) {
  switch (action.type) {
    case FETCH_MENU_START:
      return { ...state, loading: true, error: null };
    case FETCH_MENU_SUCCESS:
      return { ...state, loading: false, menu: action.menu, error: null };
    case FETCH_MENU_ERROR:
      return { ...state, loading: false, menu: null, errors: action.errors  };
    default:
      return state;
  }
}
