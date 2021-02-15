/* eslint-disable import/prefer-default-export */
import globalAppConfig from '../app/PhoenixConfig';

const {
  MOCKERY_BASE = '//www.mockery.com',
  BUFFETT_BASE = '//buffett.mockery.com',
  MAKEIT_BASE,
} = globalAppConfig.getProperties();

export { MOCKERY_BASE, BUFFETT_BASE, MAKEIT_BASE };

function getHostFromUrl(url) {
  const link = document.createElement('a');
  link.href = url;
  return link.hostname;
}

function getProtocolFromUrl(url) {
  const link = document.createElement('a');
  link.href = url;
  return link.protocol;
}

// Changes link href to map to current host.
export function setToCurrentHost(url = '') {
  const currentHost = typeof window !== 'undefined' ? window.location.host : '';
  const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http';
  const urlHost = getHostFromUrl(url);
  const urlProtocol = getProtocolFromUrl(url);
  return String(url)
    .replace(urlHost, currentHost)
    .replace(urlProtocol, currentProtocol);
}

export function getMockeryUrl(host, path) {
  const currentHost = typeof window !== 'undefined' ? window.location.host : '';
  const protocol = host.includes('//') ? '' : '//';
  return `${protocol}${host || currentHost || MOCKERY_BASE}${path}`;
}
