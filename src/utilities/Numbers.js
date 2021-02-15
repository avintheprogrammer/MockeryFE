/**
 * @type {function}
 * Checks if a string of data is a number or percent
 * @param {string} num A string representing data
 */
const isPercentNumber = num => {
  const last = num.charAt(num.length-1);
  return last === '%' ? !isNaN(num.slice(0, num.length - 1)) : !isNaN(num);
}

export const isNum = num => {
  if(typeof num === 'number') {
    return true;
  }
  if (typeof num === 'string') {
    return isPercentNumber(num);
  }
  return false;
};
/**
 * @type {function}
 * This method accurately rounds numbers to decimal places.
 * @param {float} num The number to round. String input is also handled.
 * @param {integer} decimalPlaces The number of decimal places to round to.
 */
export const roundNum = (num, decimalPlaces) => {
  const factor = 10 ** decimalPlaces;
  return Math.round(parseFloat(num) * factor) / factor;
};

/**
 * @type {function}
 * This method formats numbers to less than or equal to 8 places.
 * @param {float} num The number to format.
 */
export const formatNumber = num => {
  const numString = num.toString();
  let formattedNum = parseFloat(numString);
  if (numString.length > 8 && formattedNum < 99999999) {
    const splitNum = numString.split('.');
    formattedNum = roundNum(formattedNum, 8 - splitNum[0].length);
  }

  return formattedNum.toLocaleString();
};
