/* eslint-disable import/prefer-default-export */

export function makeItColorPicker() {
  const colors = ['purple','orange','turquoise'];
  
  const selectedNumber = Math.floor(Math.random() * Math.floor(colors.length));
  return colors[selectedNumber];
}