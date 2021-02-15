export const BREAKPOINT_MOBILE = 'mobile';
export const BREAKPOINT_TABLET = 'tablet';
export const BREAKPOINT_SMALL_DESKTOP = 'small_desktop';
export const BREAKPOINT_MEDIUM_DESKTOP = 'medium_desktop';
export const BREAKPOINT_LARGE_DESKTOP = 'large_desktop';

export const BREAKPOINT_NAMES = [
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
  BREAKPOINT_SMALL_DESKTOP,
  BREAKPOINT_MEDIUM_DESKTOP,
  BREAKPOINT_LARGE_DESKTOP,
];

export const BREAKPOINT_RANGES = {
  [BREAKPOINT_MOBILE]: {
    min: 1,
    max: 759,
  },
  [BREAKPOINT_TABLET]: {
    min: 760,
    max: 1019,
  },
  [BREAKPOINT_SMALL_DESKTOP]: {
    min: 1020,
    max: 1179,
  },
  [BREAKPOINT_MEDIUM_DESKTOP]: {
    min: 1180,
    max: 1339,
  },
  [BREAKPOINT_LARGE_DESKTOP]: {
    min: 1340,
    max: 999999,
  },
};