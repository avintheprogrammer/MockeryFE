/* eslint-disable no-case-declarations */
import cloneDeep from 'lodash/cloneDeep';
import {
  FETCH_PAGE_START, FETCH_PAGE_SUCCESS, FETCH_PAGE_ERROR,
  UPDATE_STORY, UPDATE_PAGE_DATA, UPDATE_MODULE_SOURCE,
  CHANGE_LAYOUT, UPDATE_PAGE_TEMPLATE
} from '../actions/page';

/**
 * @type {function}
 * Reduces actions related to xfinity and alters state if needed.
 * @param {object} state The current state of the application.
 * @param {object} action An object containing information about the action passed in to the reducer.
 * @returns {object} An object representing the state of the navigation in the global app state.
 */

export default function page(
  state = {
    loading: false,
    page: null,
    errors: null,
  },
  action,
) {
  switch (action.type) {
    case FETCH_PAGE_START:
      return { ...state, loading: true, error: null };
    case FETCH_PAGE_SUCCESS:
      return { ...state, loading: false, page: action.page, error: null };
    case FETCH_PAGE_ERROR:
      return { ...state, loading: false, page: action.page, errors: action.errors  };
    case UPDATE_STORY:
      const newPage = cloneDeep(state.page);
      try {
        const { column, module, row, storyid, story } = action.data;
        const storyList = newPage.layout[row].columns[column].modules[module].data.assets;
        const storyIndex = storyList.findIndex(item => item.id === storyid);
        storyList[storyIndex] = story;
      } catch (err) { ; }
      return { ...state, page: newPage };
    case UPDATE_PAGE_DATA:
      const newData = cloneDeep(state.page);
      try {
        const moduleList = action.data;
        moduleList.forEach((item) => {
          const { column, module, row, assets } = item;
          newData.layout[row].columns[column].modules[module].data.assets = assets;
        });
      } catch (err) { ; }
      return { ...state, page: newData };
    case UPDATE_MODULE_SOURCE:
      const newPageData = cloneDeep(state.page);
      try {
        const { column, module, row, sourceData } = action.data;
        newPageData.layout[row].columns[column].modules[module].data = sourceData;
      } catch (err) { ; }
      return { ...state, page: newPageData };
    case CHANGE_LAYOUT:
      const PageData = cloneDeep(state.page);
      try {
        const { column, module, row, moduleId, modulePointer, attributes } = action.data;
        const name = modulePointer || moduleId;
        PageData.layout[row].columns[column].modules[module].name = name;
        PageData.layout[row].columns[column].modules[module].attributes = attributes;
      } catch (err) { ; }
      return { ...state, page: PageData };
    case UPDATE_PAGE_TEMPLATE:
      const newPageTemplate = cloneDeep(state.page || {});
      newPageTemplate.layout = action.data;
      return { ...state, page: newPageTemplate };
    default:
      return state;
  }
}
