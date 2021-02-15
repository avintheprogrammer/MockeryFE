/* eslint-disable import/prefer-default-export, consistent-return */
import React from 'react'
import Helmet from 'react-helmet-async'
import { getCookie } from './Cookies';

const partners = ['philly.xfinity.comcast.net/', 'mr.qa.xfinity.comcast.net', 'xfinity.comcast.net', 'finance.comcast.net', 'staging.xfinity.comcast.net', 'comcast.com', 'customer.comcast.com', 'xfinitytv.comcast.net', 'xfinityconnect.mail.comcast.net', 'search.comcast.net', 'my.xfinity.com', 'www.xfinity.com'];

export const ACTIVE_PARTNER_EXP = 'active_partner_exp';

export function isXfinityReferrer(cookies) {

  if (cookies) {
    return cookies.get(ACTIVE_PARTNER_EXP) === 'xfinity';
  }

  if (typeof window === 'undefined') return;

  if (getCookie(ACTIVE_PARTNER_EXP) === 'xfinity') {
    return true;
  }

  const url = document.createElement('a');
  url.href = document.referrer;
  return (partners.indexOf(url.hostname) !== -1);
}

export const Referrer = () => {
  if(isXfinityReferrer()) {
    return (
      <Helmet>
        <script>var MOCKERY_Xfinity = true </script>
        <script src='https://polaris.xfinity.com/polaris.js' type='text/javascript' async />
      </Helmet>
    )
  }
  return null
}
