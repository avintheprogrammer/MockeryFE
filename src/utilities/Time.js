/* eslint-disable import/prefer-default-export, consistent-return */

import moment from 'moment-timezone';
import { isString } from './Strings';

/**
   * Creates a formatted time string from a timestamp
   * @type {function}
   * @param {string} A formatted timestamp string like '2017-03-02T00:00:00.000Z'
   * @returns {string} A formatted datePublished string like 'Mon, Nov 13 2017 • 2:15 PM EST'
   */

const getMoment = (date) => {
  let datePublished = date;
  if(!datePublished || !isString(date)) return null;

  const isGMT = (/(.*) (GMT)/).exec(datePublished);
  if (isGMT) datePublished = moment(`${isGMT[1]}Z`);

  return moment(datePublished);
}

export function timestampToEpochMs(date) {
  const momentDate = getMoment(date);
  if (!moment.isMoment(momentDate)) return 0;
  return momentDate
    .tz('America/New_York')
    .valueOf();
}

export function timestampToDateTime(date) {
  const momentDate = getMoment(date);
  if (!moment.isMoment(momentDate)) return date;
  // Creates a formatted date string in  ET (EST / EDT)to be rendered as the published date.
  return momentDate
    .tz('America/New_York')
    .format('ddd, MMM D YYYY • h:mm A z');
}

export function timestampToDate(date) {
  const momentDate = getMoment(date);
  if (!moment.isMoment(momentDate)) return date;
  // Creates a formatted date string in  ET (EST / EDT)to be rendered as the published date.
  return momentDate
    .tz('America/New_York')
    .format('MMMM D, YYYY');
}

export function timestampToMomentAgo(date) {
  const momentDate = getMoment(date);
  return momentDate ? momentDate.fromNow() : '';
}
