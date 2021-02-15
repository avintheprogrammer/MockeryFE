/**
 * Big Time Event Bus
 * @module BigTimeEventBus
 * Global event handler that attaches single instances of each listener. Components can register event
 * handlers with this utility to avoid polluting the runtime with multiple listeners.
 */
import { findId } from './Arrays';
import EventsFactory from './EventsFactory';

const MONITORING_SCROLL = Symbol('MONITORING_SCROLL');
const HANDLE_DEBOUNCE_SCROLL = Symbol('HANDLE_DEBOUNCE_SCROLL');
const HANDLE_THROTTLE_SCROLL = Symbol('HANDLE_THROTTLE_SCROLL');
const HANDLE_SCROLL = Symbol('HANDLE_SCROLL');

const MONITORING_RESIZE = Symbol('MONITORING_RESIZE');
const HANDLE_DEBOUNCE_RESIZE = Symbol('HANDLE_DEBOUNCE_RESIZE');

const MONITORING_BODY_RESIZE = Symbol('MONITORING_BODY_RESIZE');
const HANDLE_DEBOUNCE_BODY_RESIZE = Symbol('HANDLE_DEBOUNCE_BODY_RESIZE');

const MONITORING_CLICK = Symbol('MONITORING_CLICK');
const HANDLE_CLICK = Symbol('HANDLE_CLICK');

const MONITORING_MOUSEUP = Symbol('MONITORING_MOUSEUP');
const HANDLE_MOUSEUP = Symbol('HANDLE_MOUSEUP');

const MONITORING_TOUCHEND = Symbol('MONITORING_TOUCHEND');
const HANDLE_TOUCHEND = Symbol('HANDLE_TOUCHEND');

const MONITORING_MOUSEMOVE = Symbol('MONITORING_MOUSEMOVE');
const HANDLE_MOUSEMOVE = Symbol('HANDLE_MOUSEMOVE');

const MONITORING_MOUSEOVER = Symbol('MONITORING_MOUSEOVER');
const HANDLE_MOUSEOVER = Symbol('HANDLE_MOUSEOVER');

const MONITORING_KEYUP = Symbol('MONITORING_KEYUP');
const HANDLE_KEYUP = Symbol('HANDLE_KEYUP');

const MONITORING_IMAGES_LOAD = Symbol('MONITORING_IMAGES_LOAD');
const HANDLE_IMAGES_LOAD = Symbol('HANDLE_IMAGES_LOAD');
const IMAGES_TRACKED = Symbol('IMAGES_TRACKED');
const IMAGES_LOADED = Symbol('IMAGES_LOADED');

const MONITORING_ROUTE = Symbol('MONITORING_ROUTE');
const HANDLE_ROUTE = Symbol('HANDLE_ROUTE');

const MONITORING_SAILTHRU_LOAD = Symbol('MONITORING_SAILTHRU_LOAD');
const SAILTHRU_LOAD = Symbol('SAILTHRU_LOAD');

/**
 * Debounce
 * Debounce function that applies debounced event triggering with a timeout.
 * @param {function} callback The function to call on each trigger of the debounce function.
 * @param {number} wait The time in milliseconds to wait before each trigger of the debounce.
 * @param {context} context The logical context within which this function will run.
 */
const debounce = (callback, wait, context = this) => {
  let timeout = null;
  const later = () => callback.apply(context, null);

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * @type {object}
 * Contains logic to handle throttle functionality.
 * @property {boolean} ticking Used to keep track of when it will be most efficient to call our callback
 * function again.
 * @property {function} request All listeners attempting to trigger callback functions call this function to
 * make sure it is fired after an appropriate throttle.
 * @property {function} update Function that triggers the callback and resets the ticking boolean.
 */
const throttle = {
  ticking: false,

  request(callback) {
    return () => {
      // If not already ticking, call <code>update()</code> with <code>requestAnimationFrame()</code>
      if (!this.ticking) {
        requestAnimationFrame(() => this.update(callback));
      }

      this.ticking = true;
    };
  },

  update(callback) {
    callback();
    this.ticking = false;
  },
};

/**
 * @type {Object|<string>}
 * Object that keeps track of registered listeners. This object will be maintained as different event tracking is turned on and off.
 */
const listeners = {};

let pageNodeId;
let pageCurrentPath;
let pageNewPath;
let bodySizeObserver;

// event.composedPath() polyfill function
const propagationPath = event => {
  let element = event.target || null;
  const pathArr = [element];

  if (!element || !element.parentElement) {
    return [];
  }

  while (element.parentElement) {
    element = element.parentElement;
    pathArr.unshift(element);
  }
  return pathArr.reverse();
};


/**
 * Big Time Event Bus
 * @constructor
 * The Big Time Event Bus allows for the ability to only attach one of each type of listener (scroll, resize,
 * breakpointChange) to the runtime. Individual components that need to run functions that are triggered by particular events will
 * implement this utility and register their callbacks using <code>on()</code>.
 * @example
 * // This will register the <code>handleResize()</code> function to run on resize.
 * BigTimeEventBus.on('resize', this.handleResize);
 *
 */
const BigTimeEventBus = {
  // Custom events
  ROUTE_EVENT: typeof window === 'object' && EventsFactory.createNewEvent('route') || '',
  // Monitoring flags
  [MONITORING_SCROLL]: false,
  [MONITORING_RESIZE]: false,
  [MONITORING_BODY_RESIZE]: false,
  [MONITORING_IMAGES_LOAD]: false,
  [MONITORING_CLICK]: false,
  [MONITORING_MOUSEUP]: false,
  [MONITORING_MOUSEMOVE]: false,
  [MONITORING_MOUSEOVER]: false,
  [MONITORING_TOUCHEND]: false,
  [MONITORING_KEYUP]: false,

  /* Scroll
   ============================= */

  // Debounced scroll trigger.
  [HANDLE_DEBOUNCE_SCROLL]: debounce(() => {
    BigTimeEventBus.trigger('scroll', { pageNodeId, pageYOffset: window.pageYOffset }, 'debounce');
  }, 100),

  // Throttled scroll trigger.
  [HANDLE_THROTTLE_SCROLL]: throttle.request(() => {
    BigTimeEventBus.trigger('scroll', { pageNodeId, pageYOffset: window.pageYOffset }, 'throttle');
  }),

  // Normal scroll trigger.
  [HANDLE_SCROLL]: () => {
    BigTimeEventBus.trigger('scroll', { pageNodeId, pageYOffset: window.pageYOffset }, 'none');
  },

  dispatchRouteEvent(id) {
    if (typeof window !== 'object') return;

    if (id) {
      this.setPageNodeId(id);
    }

    window.dispatchEvent(this.ROUTE_EVENT);
  },

  /**
   * A function that turns on scroll monitoring. Attaches appropriate listeners for debounced, throttled,
   * and normal scroll.
   */
  monitorScroll() {
    if (this[MONITORING_SCROLL]) return;

    window.addEventListener('scroll', this[HANDLE_DEBOUNCE_SCROLL], false);
    window.addEventListener('scroll', this[HANDLE_THROTTLE_SCROLL], false);
    window.addEventListener('scroll', this[HANDLE_SCROLL], false);

    this[MONITORING_SCROLL] = true;
  },

  /**
   * A function that turns off scroll monitoring. Detaches appropriate listeners for debounced, throttled,
   * and normal scroll.
   */
  deregisterScroll() {
    if (!this[MONITORING_SCROLL]) {
      return;
    }

    window.removeEventListener('scroll', this[HANDLE_DEBOUNCE_SCROLL]);
    window.removeEventListener('scroll', this[HANDLE_THROTTLE_SCROLL]);
    window.removeEventListener('scroll', this[HANDLE_SCROLL]);

    this[MONITORING_SCROLL] = false;
  },

  /* Resize
   ============================= */

  // Debounced resize trigger.
  [HANDLE_DEBOUNCE_RESIZE]: debounce(() => {
    const breakpoints = BigTimeEventBus.getBreakpoints();

    BigTimeEventBus.trigger(
      'resize',
      {
        pageNodeId,
        breakpoints,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      'debounce',
    );
  }),

  /**
   * A function that turns on resize monitoring. Attaches appropriate listener for window resize.
   */
  monitorResize() {
    if (this[MONITORING_RESIZE]) return;

    window.addEventListener('resize', this[HANDLE_DEBOUNCE_RESIZE], false);

    this[MONITORING_RESIZE] = true;
  },

  /**
   * A function that turns off resize monitoring. Detaches appropriate listener for window resize.
   */
  deregisterResize() {
    if (!this[MONITORING_RESIZE]) return;

    window.removeEventListener('resize', this[HANDLE_DEBOUNCE_RESIZE]);

    this[MONITORING_RESIZE] = false;
  },
  // Debounced body resize trigger.
  [HANDLE_DEBOUNCE_BODY_RESIZE]: debounce(() => {
    BigTimeEventBus.trigger(
      'bodyResize',
      null,
      'debounce',
    );
  }),


  /* Body Resize
   ============================= */

  /**
   * A function that turns on document.body resize monitoring via MutationObserver. Attaches appropriate listener.
   */
  monitorBodyResize() {
    if (this[MONITORING_BODY_RESIZE]) return;

    let lastWidth;
    let lastHeight;

    bodySizeObserver = new MutationObserver(() => {
      if (document.body.offsetWidth === lastWidth &&
        document.body.offsetHeight === lastHeight) {
        return;
      }

      lastWidth = document.body.offsetWidth;
      lastHeight = document.body.offsetHeight;

      (this[HANDLE_DEBOUNCE_BODY_RESIZE])();
    });

    bodySizeObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    this[MONITORING_BODY_RESIZE] = true;
  },

  /**
   * A function that turns off resize monitoring. Detaches appropriate listener for window resize.
   */
  deregisterBodyResize() {
    if (!this[MONITORING_BODY_RESIZE]) return;
    bodySizeObserver.disconnect();

    this[MONITORING_BODY_RESIZE] = false;
  },

  /* Mouse Move
   ============================= */

  // Debounced mousemove trigger.
  [HANDLE_MOUSEMOVE]: e => {
    BigTimeEventBus.trigger(
      'mousemove',
      {
        pageNodeId,
        eventObject: e.target ? e.target : e.srcElement,
        x: e.clientX,
        y: e.clientY,
      },
      'none',
    );
  },

  /**
   * A function that turns on mousemove monitoring. Attaches appropriate listener for window mousemove.
   */
  monitorMouseMove() {
    if (this[MONITORING_MOUSEMOVE]) return;

    window.addEventListener('mousemove', this[HANDLE_MOUSEMOVE], false);

    this[MONITORING_MOUSEMOVE] = true;
  },

  /**
   * A function that turns off mousemove monitoring. Detaches appropriate listener for window mousemove.
   */
  deregisterMouseMove() {
    if (!this[MONITORING_MOUSEMOVE]) return;

    window.removeEventListener('mousemove', this[HANDLE_MOUSEMOVE]);

    this[MONITORING_MOUSEMOVE] = false;
  },

  /* Mouse Over
  ============================= */

  // Debounced mouseover trigger.
  [HANDLE_MOUSEOVER]: e => {
    BigTimeEventBus.trigger(
      'mouseover',
      {
        pageNodeId,
        componentDataId: e.composedPath ? findId(e.composedPath()) : findId(propagationPath(e)),
        eventObject: e.target ? e.target : e.srcElement,
      },
      'throttle',
    );
  },


  /**
   * A function that turns on mousemove monitoring. Attaches appropriate listener for window mousemove.
   */
  monitorMouseOver(componentID) {
    if (this[MONITORING_MOUSEOVER]) return;

    if (typeof componentID !== "undefined") {
      document.getElementById(componentID).addEventListener('mouseover', this[HANDLE_MOUSEOVER], false);
    }
    else {
      window.addEventListener('mouseover', this[HANDLE_MOUSEOVER], false);
    }

    this[MONITORING_MOUSEOVER] = true;
  },

  /**
   * A function that turns off mousemove monitoring. Detaches appropriate listener for window mousemove.
   */
  deregisterMouseOver() {
    if (!this[MONITORING_MOUSEOVER]) return;

    window.removeEventListener('mouseover', this[HANDLE_MOUSEOVER]);

    this[MONITORING_MOUSEOVER] = false;
  },


  /* Touch End
  ============================= */

  // Debounced TOUCHEND trigger.
  [HANDLE_TOUCHEND]: e => {
    BigTimeEventBus.trigger(
      'touchend',
      {
        pageNodeId,
        componentDataId: e.composedPath ? findId(e.composedPath()) : findId(propagationPath(e)),
        eventObject: e.target ? e.target : e.srcElement,
      },
      'throttle',
    );
  },

  /**
   * A function that turns on mousemove monitoring. Attaches appropriate listener for window mousemove.
   */
  monitorTouchEnd(componentID) {
    if (this[MONITORING_TOUCHEND]) return;

    if (typeof componentID !== "undefined") {
      document.getElementById(componentID).addEventListener('touchend', this[HANDLE_TOUCHEND], false);
    }
    else {
      window.addEventListener('touchend', this[HANDLE_TOUCHEND], false);
    }

    this[MONITORING_TOUCHEND] = true;
  },

  /**
   * A function that turns off mousemove monitoring. Detaches appropriate listener for window mousemove.
   */
  deregisterTouchEnd() {
    if (!this[MONITORING_TOUCHEND]) return;

    window.removeEventListener('touchend', this[HANDLE_TOUCHEND]);

    this[MONITORING_TOUCHEND] = false;
  },

  /* Window Mouseup
   ============================= */

  // The mouseup trigger.
  [HANDLE_MOUSEUP]: e => {
    BigTimeEventBus.trigger('mouseup', e, 'none');
  },

  /**
   * A function that turns on window mouseup monitoring. Attaches appropriate listener for window mouseup.
   */
  monitorMouseup() {
    if (this[MONITORING_MOUSEUP]) return;

    window.addEventListener('mouseup', this[HANDLE_MOUSEUP], false);

    this[MONITORING_MOUSEUP] = true;
  },

  /**
   * A function that turns off window mouseup monitoring. Detaches appropriate listener for window mouseup.
   */
  deregisterMouseup() {
    if (!this[MONITORING_MOUSEUP]) return;

    window.removeEventListener('mouseup', this[HANDLE_MOUSEUP]);

    this[MONITORING_MOUSEUP] = false;
  },

  /* Window Click
   ============================= */

  // The click trigger.
  [HANDLE_CLICK]: e => {

    BigTimeEventBus.trigger(
      'click',
      {
        pageNodeId,
        componentDataId: e.composedPath ? findId(e.composedPath()) : findId(propagationPath(e)),
        eventObject: e.target ? e.target : e.srcElement,
        x: e.clientX,
        y: e.clientY,
      },
      'throttle',
    );
  },

  /**
   * A function that turns on window click monitoring. Attaches appropriate listener for window click.
   */
  monitorClick() {
    if (this[MONITORING_CLICK]) return;

    window.addEventListener('click', this[HANDLE_CLICK], false);

    this[MONITORING_CLICK] = true;
  },

  /**
   * A function that turns off window click monitoring. Detaches appropriate listener for window click.
   */
  deregisterClick() {
    if (!this[MONITORING_CLICK]) return;

    window.removeEventListener('click', this[HANDLE_CLICK]);

    this[MONITORING_CLICK] = false;
  },

  /* Window Keyup
   ============================= */

  // The keyup trigger.
  [HANDLE_KEYUP]: e => {
    BigTimeEventBus.trigger('keyup', e, 'none');
  },

  /**
   * A function that turns on window keyup monitoring. Attaches appropriate listener for window keyup.
   */
  monitorKeyup() {
    if (this[MONITORING_KEYUP]) return;

    window.addEventListener('keyup', this[HANDLE_KEYUP], false);

    this[MONITORING_KEYUP] = true;
  },

  /**
   * A function that turns off window keyup monitoring. Detaches appropriate listener for window keyup.
   */
  deregisterKeyup() {
    if (!this[MONITORING_KEYUP]) return;

    window.removeEventListener('keyup', this[HANDLE_KEYUP]);

    this[MONITORING_KEYUP] = false;
  },

  /* Window Route
   ============================= */

  // The route trigger.
  [HANDLE_ROUTE]: () => {
    BigTimeEventBus.trigger(
      'route',
      {
        pageNodeId,
        currentPath: pageCurrentPath,
        newPath: pageNewPath
      },
      'throttle',
    );
  },

  /**
   * A function that turns on window route monitoring. Attaches appropriate listener for window route.
   */
  monitorRoute(currentPath = '', newPath = '') {
    if (this[MONITORING_ROUTE]) return;

    this.setRoutePaths(currentPath, newPath);

    window.addEventListener('route', this[HANDLE_ROUTE], false);

    this[MONITORING_ROUTE] = true;
  },

  /**
   * A function that turns off window route monitoring. Detaches appropriate listener for window route.
   */
  deregisterRoute() {
    if (!this[MONITORING_ROUTE]) return;

    window.removeEventListener('route', this[HANDLE_ROUTE]);

    this[MONITORING_ROUTE] = false;
  },
  /**
   * A function that returns given breakpoints and whether the current viewport fits within any of the defined bounds.
   * @returns {object} An object containing booleans that tracks which media queries the viewport is currently matching.
   */
  getBreakpoints() {
    const s = window.matchMedia('(max-width: 677px)').matches;
    const m = window.matchMedia('(min-width: 678px) and (max-width: 959px)').matches;
    const l = window.matchMedia('(min-width: 960px) and (max-width: 1289px)').matches;
    const xl = window.matchMedia('(min-width: 1290px)').matches;
    return { s, m, l, xl };
  },

  /* Sailthru For You Breaker
    We can refactor this in the future to be generic enough to handle any third party
    communications made to the react app
    ========================= */

  // Sailthru For You data loaded
  [SAILTHRU_LOAD]: data => {
    BigTimeEventBus.trigger(
      'sailthruLoaded',
      {
        data
      },
      'none',
    );
  },

  /**
   * A function that turns on sailthru loaded event monitoring. Maps over the sailthru data on the current page to track
   * when they are all loaded.
   */
  monitorSailthruLoad() {
    if (this[MONITORING_SAILTHRU_LOAD]) return;

    window.addEventListener('sailthruLoaded', this[SAILTHRU_LOAD], false);

    this[MONITORING_SAILTHRU_LOAD] = true;
  },

  /**
   * A function that turns off sailthru load monitoring. Detaches appropriate listener for window route.
   * This function is called in a global mps component called sailthru phoenix
   */
  onSailthruLoaded(data) {
    if (!this[MONITORING_SAILTHRU_LOAD]) return;
    this[SAILTHRU_LOAD](data);
    this[MONITORING_SAILTHRU_LOAD] = false;
    window.removeEventListener('sailthruLoaded', this[SAILTHRU_LOAD]);
  },

  /* Images
   ============================= */
  [IMAGES_LOADED]: 0,
  [IMAGES_TRACKED]: [],

  // Images loaded trigger.
  [HANDLE_IMAGES_LOAD]: () => {
    BigTimeEventBus.trigger('imagesLoaded', undefined, 'throttle');
    BigTimeEventBus[MONITORING_IMAGES_LOAD] = false;
  },

  /**
   * A function that turns on images loaded event monitoring. Maps over all the images on the current page to track
   * when they are all loaded.
   */
  monitorImagesLoad() {
    const images = Array.from(document.getElementsByTagName('img'));
    const loadedImages = images.filter(image => image.complete);
    this[IMAGES_TRACKED] = images;
    this[IMAGES_LOADED] = loadedImages.length;
    this[MONITORING_IMAGES_LOAD] = true;
  },

  /**
   * A function that tracks when all images have been loaded, and calls the appropriate function when they have all
   * been loaded into memory;
   */
  onImagesLoaded() {
    if (!this[MONITORING_IMAGES_LOAD]) {
      return; // images are not being tracked
    }

    const images = this[IMAGES_TRACKED];
    const loadedImages = images.filter(image => image.complete);
    this[IMAGES_LOADED] = loadedImages.length;

    if (this[IMAGES_LOADED] === this[IMAGES_TRACKED].length) {
      this[HANDLE_IMAGES_LOAD]();
    }
  },

  /* Setting Page Node Id
   ============================= */

  /**
   * Passes pageNodeId property from Navigator Component
   * @param {string} id The id of the page to listen for (resize, scroll, click)
   */
  setPageNodeId(id) {
    pageNodeId = id;
  },

  setRoutePaths(currentPath, newPath) {
    pageCurrentPath = currentPath;
    pageNewPath = newPath;
  },
  /* Event Control
   ============================= */

  /**
   * Appends another listener instance to the module, to be tracked and triggered by the global events that are registered here.
   * @param {string} key The key of the event to listen for (resize, scroll)
   * @param {function} fn The function to trigger when this event is fired.
   * @param {string} attenuation The attenuation variant of the event to listen for, like `throttle` or
   * `debounce`
   */
  on(key, fn, attenuation = 'throttle') {
    const attenuatedKey = key !== 'resize' ? `${key}_${attenuation}` : `${key}_debounce`;

    if (!listeners[attenuatedKey]) {
      listeners[attenuatedKey] = [];
    }

    listeners[attenuatedKey] = [...listeners[attenuatedKey], fn];
  },

  /**
   * Removes a given listener instance from the module. The given function will cease to be tracked and triggered by the global events that are registered
   * @param {string} key The key of the event to listen for (resize, scroll)
   * @param {function} fnToReomve The function to remove from tracking.
   * @param {string} attenuation The attenuation variant of the event to listen for, like `throttle` or `debounce`
   */
  remove(key, fnToRemove, attenuation = 'throttle') {
    const attenuatedKey = key !== 'resize' ? `${key}_${attenuation}` : `${key}_debounce`;

    if (listeners[attenuatedKey]) {
      listeners[attenuatedKey] = listeners[attenuatedKey].filter(fn => fn !== fnToRemove);
    }
  },

  /**
   * Triggers an event. Iterates over all the registered listeners, triggers them appropriately, and passes them any relevant data.
   * @param {string} key The key of the event to trigger.
   * @param {object} data Any details to pass down to listening functions.
   * @param {string} attenuation The attenuation variant of the event to trigger, like `throttle` or `debounce`
   */
  trigger(key, data, attenuation = 'throttle') {
    // eslint-disable-next-line no-console
    const attenuatedKey = key !== 'resize' ? `${key}_${attenuation}` : `${key}_debounce`;

    if (!listeners[attenuatedKey]) {
      return;
    }
    listeners[attenuatedKey].forEach(fn => {
      if (typeof fn === 'function') {
        fn(data);
      }
    });
  },
};

export default BigTimeEventBus;
