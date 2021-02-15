/* eslint-disable import/prefer-default-export */

/**
 * @type {function}
 * Checks if type is article
 * @param {String} type of asset.
 * @returns {boolean} true if asset is article.
 */
export function isArticle (type = '') {
    const types = ["mockerynewsstory", "sponsored", "blogpost", "wirestory", "partnerstory", "pressrelease", "slideshow"];
    return types.includes(type);
}

/**
 * @type {function}
 * Checks if type is video
 * @param {String} type of asset.
 * @returns {boolean} true if asset is video.
 */
export function isVideo (type = '') {
    return type === 'mockeryvideo';
}
