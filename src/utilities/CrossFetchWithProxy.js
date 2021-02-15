import { parse } from 'url';
import crossFetch from 'cross-fetch';
import tunnelAgent from 'tunnel-agent';
import { getProxyForUrl } from 'proxy-from-env';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getProxy(url = '') {
    const urlObject = parse(url) || {};
    const urlProtocol = String(urlObject.protocol).replace(':', '');

    const proxyUrl = getProxyForUrl(url);
    if (!proxyUrl) {
        return {
            proxy: null,
            url: null,
            method: 'noProxy',
        }
    }

    const proxyObject = parse(proxyUrl) || {};
    const proxyProtocol = String(proxyObject.protocol).replace(':', '');
    const proxyPort = proxyObject.port || (proxyProtocol === 'https' ? 443 : 80);
    proxyObject.port = proxyPort;
    const tunnelMethod = urlProtocol
        .concat('Over')
        .concat(capitalizeFirstLetter(proxyProtocol));

    return {
        proxy: proxyObject,
        target: urlObject,
        method : tunnelMethod,
    }
}

function fetch(url, options = {}) {
    const { proxy, target, method } = getProxy(url);

    if (method === 'noProxy' || options.agent) {
        return crossFetch(url, options);
    }

    // https://github.com/request/request/blob/b12a6245d9acdb1e13c6486d427801e123fdafae/lib/tunnel.js#L124-L130
    if (method.startsWith('httpOver')) {
        const targetHostname = target.hostname;
        target.path = target.protocol
            .concat('//')
            .concat(target.host)
            .concat(target.path);
        target.port = proxy.port;
        target.host = proxy.host;
        target.hostname = proxy.hostname;
        target.auth = proxy.auth;
        const headers = ((options || { }).headers || { });
        return crossFetch(target, {
            ...options,
            headers: { ...headers, 'Host': targetHostname },
        });
    }

    const tunnel = tunnelAgent[method](Object.assign({
        proxy: {
            port: proxy.port,
            host: proxy.hostname,
            proxyAuth: proxy.auth
        }
    }));
    const agent = tunnel ? {agent : tunnel} : {};

    return crossFetch(url, {
        ...options,
        ...agent,
    });
}

fetch.default = fetch;
export default fetch;
