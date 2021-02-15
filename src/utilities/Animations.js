/* eslint-disable import/prefer-default-export */
// The speed constant that dictates uniform marquee speed.
const TRANSITION_SPEED_FACTOR = 1 / 30;

export function createMarqueeStyles(cssClassName, width) {
  // Setting the marquee css animation, adjusting duration based on speed factor.
  return {
    animation: `${cssClassName} ${TRANSITION_SPEED_FACTOR * width}s linear infinite`,
  };
}
