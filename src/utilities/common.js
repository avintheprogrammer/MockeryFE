/* eslint-disable import/prefer-default-export */
/* eslint func-names: ["error", "never"] */
/* eslint-env es6 */

const CommonUtils = {
  /**
 * @type {function}
 * 
 * @returns {boolean} true if the device is mobile.
 */
  isMobile() {
    if (typeof navigator === 'undefined') {
      return false;
    }
    if (/ipad|silk/i.test(navigator.userAgent)) {
      return false;
    } else if (/mobi|phone/i.test(navigator.userAgent)) {
      return true;
    }
    return false;
  },

  /**
   * @type {function}
   * 
   * @returns {boolean} true if the device is tablet.
   */
  isTablet() {
    if (typeof navigator === 'undefined') {
      return false;
    }
    if (!this.isMobile() && (/android|ios|ipad|silk/i.test(navigator.userAgent))) {
      return true;
    }
    return false;
  },

  deviceDetectType() {
    if (this.isMobile()) {
      return "mobile";
    } else if (this.isTablet()) {
      return "tablet";
    }
    return "desktop";
  },

  // disabledAutoPlayByUserAgent() {
  //   if (typeof navigator === 'undefined') {
  //     return false;
  //   }
  //   const strToArr = JSON.parse(VIDEO_AUTOPLAY_USER_AGENT);
  //   const browserCheck = navigator.userAgent.match(/^((?!chrome|android|crios|fxios).)*safari/i);
  //   if (browserCheck != null && browserCheck[0].toLowerCase().indexOf("safari") !== -1) {
  //     const version = navigator.userAgent.match(/version\/(\d+)/i);

  //     if (version[1] === strToArr[0].version) {
  //       return true;
  //     }
  //   }
  //   return false;
  // },

  isChrome66() {
    if (typeof navigator === 'undefined') {
      return false;
    }
    const userAgent = navigator.userAgent;
    const browserCheck = userAgent.match(/chrome/i);
    if (browserCheck != null && browserCheck[0].toLowerCase() === 'chrome') {
      const verIndex = browserCheck.index;
      const ver = userAgent.substring(verIndex + 7, verIndex + 9);
      if (!isNaN(ver) && ver >= 66) {
        return true;
      }
    }
    return false;
  },

  isMOCKERYReferrerWithChrome66(isIntraSiteLink) {
    if (typeof document === 'undefined') {
      return false;
    }
    if (this.isChrome66()) {
      if (isIntraSiteLink) { 
        return true; 
      }
      if (document.referrer && document.referrer.indexOf("mockery.com") === -1) {
        return false;
      }
      else if (!document.referrer) {
        return false;
      }
      return true;
    }
    return true;
  },

  isBrowserSupportsHLS() {
    if (typeof document === 'undefined') {
      return false;
    }
		return document.createElement('video').canPlayType('application/vnd.apple.mpegURL');
	},
}

export default CommonUtils;
