/* eslint-disable import/prefer-default-export, consistent-return */

function validateRegionCookie(regionCookie) {
  if (regionCookie !== 'USA' && regionCookie !== 'WORLD') {
    return 'USA';
  }
  return regionCookie;
}

export function getCookie(name) {
  if (typeof window === 'undefined') return;
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(`${name}=`);
    if (cStart !== -1) {
      cStart = cStart + name.length + 1;
      let cEnd = document.cookie.indexOf(";", cStart);
      if (cEnd === -1) {
        cEnd = document.cookie.length;
      }
      return unescape(document.cookie.substring(cStart, cEnd));
    }
  }
  return "";
}

export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
}

export function createCookie(name, value, hours) {
  const domain = (document.location.host.indexOf('mockery.com') >= 0) ? ';domain=.mockery.com' : ';domain=localhost';
  if (typeof window === 'undefined') return;
  if (getCookie(name) !== value) {
    let expires = '';
    if (hours !== 0) {
      const date = new Date();
      date.setHours(date.getHours() + hours);
      expires = `;expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires};path=/${domain}`;
  }
}

export function getRegionCookie(cookies) {
  const regionCookies = {
    selectedRegion: 'USA',
    defaultRegion: 'USA'
  };
  const REGION_COOKIE_MAX_AGE = 6 * 60 * 60; // 6 hours

  if (cookies) {
    if (cookies.get('selectedRegion')) {
      return {
        selectedRegion: validateRegionCookie(cookies.get('selectedRegion')),
        defaultRegion: validateRegionCookie(cookies.get('region'))
      };
    }

    if (cookies.get('region')) {
      cookies.set('selectedRegion',
        validateRegionCookie(cookies.get('region')),
        {
          path: '/',
          domain: '.mockery.com',
          maxAge: REGION_COOKIE_MAX_AGE
        }
      );

      return {
        selectedRegion: validateRegionCookie(cookies.get('region')),
        defaultRegion: validateRegionCookie(cookies.get('region'))
      };
    }
  }

  if (typeof document !== 'undefined') {
    if (getCookie('selectedRegion')) {
      return {
        selectedRegion: validateRegionCookie(getCookie('selectedRegion')),
        defaultRegion: validateRegionCookie(getCookie('region'))
      };
    }

    if (getCookie('region')) {
      createCookie('selectedRegion', validateRegionCookie(getCookie('region')), 6);
      return {
        selectedRegion: validateRegionCookie(getCookie('region')),
        defaultRegion: validateRegionCookie(getCookie('region'))
      };
    }
  }

  return regionCookies;
}

export function hasProCookie(cookies) {
  return Boolean(cookies && cookies.get('ispro'));
}
