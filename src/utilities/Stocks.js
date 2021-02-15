/* eslint-disable import/prefer-default-export, no-return-assign, no-param-reassign */
import { flattenDeep } from './Arrays';

export function isSecurity(tagName) {
  return tagName === 'security' || tagName === 'company';
}

export function pullIssueIds(body = []) {
  const bodyStocks = body
    .filter((bodyItems) => isSecurity(bodyItems.tagName));

  const tickerString = flattenDeep(bodyStocks).reduce(
    (theString, group) => (theString += `${group.attributes.symbol}|`),
    '',
  );

  return tickerString;
}
