/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */

export function adViewability(callBackFn) {
  window.mps = window.mps || {};
  window.mps._queue = window.mps._queue || {};
  window.mps._queue.adview = window.mps._queue.adview || [];
  window.mps._queue.adview.push(callBackFn);
}

export function adLoading(callBackFn) {
  window.mps = window.mps || {}; 
  window.mps._queue = window.mps._queue || {}; 
  window.mps._queue.adload = window.mps._queue.adload || [];
  window.mps._queue.adload.push(callBackFn);
}
