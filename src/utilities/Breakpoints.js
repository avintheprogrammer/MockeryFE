/* eslint-disable */
import BigTimeEventBus from './EventBus';
import EventsFactory from './EventsFactory';
import { BREAKPOINT_NAMES, BREAKPOINT_RANGES } from './BreakpointConstants';

/**
 * Breakpoints Utility
 * @constructor
 * Global breakpoint tracking utility. Provides awareness of the current breakpoint to components that implement this
 * utility. Also contains the ability to trigger a 'breakpointChange' event on resize.
 */

const Breakpoints = {
  /**
   * @type {string}
   * Used to keep track of the current breakpoint.
   */
  _current: null,

  /**
   * @type {function}
   * Used to register the resize listener with BigTimeEventBus to track when the user's viewport switches breakpoints.
   * Also fires an initial resize trigger to make sure this module is instantiated with the current
   * breakpoint.
   * @see BigTimeEventBus.on
   * @see BigTimeEventBus.trigger
   */
  monitorBreakpoints() {
    // only on client render
    if (typeof window === 'undefined') {
      return;
    }

    if (typeof window.mps !== 'undefined' && typeof window.mps.responsiveApply === 'function') {
      window.addEventListener('breakpointChange', () => window.mps.responsiveApply());
    }
    // set resize listener
    BigTimeEventBus.on('resize', () => this.refreshValue());
    // initial call to check breakpoint
    setTimeout(() => {
      BigTimeEventBus.trigger('resize');
    }, 200);
  },

  /**
   * @type {obj}
   * Store timeout that recursively calls refreshValue if no value is present.
   * Store it to cancel it when necessary.
   */
  refreshTO: null,

  /**
   * @type {Number}
   * Maximum times to call refreshValue recursively. Prevents memory leaks.
   */
  maxRecursiveRefresh: 100,

  /**
   * @type {Number}
   * The current number of times refreshValue has been called recursively.
   * Incremented within settimeout that calls refreshValue.
   */
  currentRecursiveRefresh: 0,

  /**
   * @type {function}
   * Fired whenever BigTimeEventBus triggers a resize event. Looks at the psuedo element on the body to get immediate
   * feedback on what the current breakpoint is. It then will update this module's <code>_current</code> value and
   * trigger a <code>breakpointChange</code> event through BigTimeEventBus to inform all listening components of the new
   * breakpoint value.
   * @see BigTimeEventBus.trigger
   */
  refreshValue() {
    if (typeof window === 'undefined') {
      return;
    }
    // set new BP if different from _current
    const contentValue = window
      .getComputedStyle(document.querySelector('body'), ':after')
      .getPropertyValue('content');
    let newBreakpoint = String(contentValue).replace(/\"/g, '');

    if (newBreakpoint === 'none') {
      // use JS
      newBreakpoint = this.getBreakpointNameFromViewportWidth();
    }

    // If neither current is set and the breakpoint has no value defined, call this function again.
    if (this._current === null && newBreakpoint.length < 1) {
      clearTimeout(this.refreshTO);
      if (this.currentRecursiveRefresh <= this.maxRecursiveRefresh) {
        this.refreshTO = setTimeout(() => {
          this.currentRecursiveRefresh += 1;
          this.refreshValue();
        }, 500);
      }
    } else if (newBreakpoint !== this._current && newBreakpoint.length > 0) {
      this._current = newBreakpoint;
      BigTimeEventBus.trigger('breakpointChange', { newBreakpoint });
      const breakPointChangeEvent = EventsFactory.createNewEvent('breakpointChange');
      window.dispatchEvent(breakPointChangeEvent);
    }
  },

  getBreakpointNameFromViewportWidth() {
    const width = window.innerWidth;

    if (!width) {
      return BREAKPOINT_NAMES[BREAKPOINT_NAMES.length-1];
    }

    return BREAKPOINT_NAMES.reduce((foundName, bpName) => {
      if (foundName) return foundName;

      return width <= BREAKPOINT_RANGES[bpName].max ? bpName : null;
    }, null);
  },

  /**
   * @type {function}
   * Getter function to return the current breakpoint value.
   */
  current() {
    // return current breakpoint
    return this._current;
  },

  /**
   * @type {function}
   * Convenience method to check whether our current breakpoint would be classified as mobile.
   */
  isMobile() {
    return this._current === 'mobile' || this._current === 'tablet';
  },

  isSmallMobile() {
    return this._current === 'mobile';
  },
  
  isDesktop() {
    return this._current !== 'mobile' && this._current !== 'tablet';
  },

  /**
   * @type {function}
   * Convenience method to check whether our current breakpoint would be classified as large-desktop.
   */

  isSmallDesktop() {
    return this._current === 'small_desktop';
  },

  isLargeDesktop() {
    return this._current === 'large_desktop';
  },
};

export default Breakpoints;
