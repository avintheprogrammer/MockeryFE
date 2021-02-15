/**
 * TimeConversion Utility
 * @constructor
 * Global convert time utility. When time value pass in as number,
 * use this utitlity to pass the number and return the actual minutes.
 */

/**
 * Formats an int to be a two digit string
 * @type {function}
 * @param {number} num A one or two digit number
 * @returns {string} A formatted number string
 */
const formatInt = num => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

const TimeConversion = {
  /**
   * Creates a formatted time string from number of seconds
   * @type {function}
   * @param {number} seconds The number of seconds to be formatted
   * @returns {string} A formatted time string of hours:minutes:seconds
   */
  secondsToFormattedTime(seconds, leadingZero=true) {
    const secondsPerHour = 3600;
    const secondsPerMinute = 60;

    let remaining = seconds;
    const hours = Math.floor(remaining / secondsPerHour);
    remaining -= secondsPerHour * hours;
    const minutes = Math.floor(remaining / secondsPerMinute);
    remaining -= secondsPerMinute * minutes;

    if (!leadingZero && hours === 0) {
      return `${minutes}:${formatInt(remaining)}`;
    } else if (!leadingZero && hours > 0) {
        const formattedValues = `${formatInt(minutes)}:${formatInt(remaining)}`;
        return `${hours}:${formattedValues}`;
    }

    let formattedValues = `${formatInt(minutes)}:${formatInt(remaining)}`;
    if (hours > 0) {
      formattedValues = `${formatInt(hours)}:${formattedValues}`;
    }
    return formattedValues;
  },

  /**
   * Acts as a type checker before passing to secondsToFormattedTime
   * @type {function}
   * @param {number or string} time The time to be formatted
   * @returns {string} A formatted time string of hours:minutes:seconds
   */
  formatTime(time) {
    if (typeof time !== 'string') {
      const duration = time || 0;
      return this.secondsToFormattedTime(duration);
    }
    return time;
  },
};

export default TimeConversion;
