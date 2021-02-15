/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */

/**
 * @type {function}
 * Overrides pathname for any route - reads config PATH_OVERRIDE and overrides path, otherwise returns original path
 * @param {string} pathname - original path
 * @param {string} pathOverrideString - stringified config object
 * @returns {array} new pathname
 */
export function pathOverride(pathname, pathOverrideObject = {}) {
  if(typeof window !== 'object' || !window.__MOCKERY_META_DATA) return pathname;

  const brand = __MOCKERY_META_DATA.brand || 'mockery';
  const pathMapping =  pathOverrideObject[pathname];
  const newPath = pathMapping && pathMapping[brand];

  return newPath || pathname;
};

/**
 * @type {function}
 * Removes contentText from WildCardPage module's data attribute
 * @param {array} data - page layout
 * @returns {array}
 */
function getMPSLayout(data = []) {
  return data.reduce((resolved, item) => {
    if (item.columns) {
      resolved.columns = getMPSLayout(item.columns); // eslint-disable-line
      return resolved;
    }

    if (item.modules) {
      resolved.modules = getMPSLayout(item.modules); // eslint-disable-line
      return resolved;
    }

    if (item.name === 'WildcardPage' && item.data) {
      const wildCardItem = {
        ...item,
        data: {
          ...item.data,
          contentText: null,
          promoText: null,
        },
      };

      resolved.push(wildCardItem);
      return resolved;
    }

    resolved.push(item);
    return resolved;
  }, []);
}


/**
 * @type {function}
 * Returns MPS Data
 * @param {object} page - page data
 * @returns {object}
 */
export function getMPSData(page = {}) {
  return {
    ...page,
    layout: getMPSLayout(page.layout)
  };
}
