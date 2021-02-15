/* eslint-disable import/prefer-default-export, consistent-return, no-underscore-dangle */
import fetch from 'cross-fetch';
import globalAppConfig from '../app/PhoenixConfig';
import userActionUtil from '../actions/userActionUtil';
import { isNewProUser } from '../actions/authenticationActions';

const { REGISTER_BASE } = globalAppConfig.getProperties();

const pianoRequestParams = {
  url: `${REGISTER_BASE}/auth/api/`,
  pid: '152',
  timeout: 10000,
  fetchType: 'GET'
}

function receivePianoToken(json) {
  if (typeof json === 'undefined')
    return;
  return json.payload_token;
}

function fetchToken(receiveAction, requestObj) {
  const {
    url,
    fetchType,
    timeout
  } = requestObj;
  return fetch(url, {
      method: fetchType,
      timeout,
      mode: "cors",
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(json => receiveAction(json));
}

function buildPianoRequest() {
  return userActionUtil.makeRequestObj(pianoRequestParams);
}

export function fetchPianoToken(receiveAction, dispatch) {
  fetchToken(receivePianoToken, buildPianoRequest()).then(result => dispatch(receiveAction(result)));
}

function syncBrandData() {
  const brandData = {
    uid: SURF.globals.session.uid,
    signature: '',
    user_data: {
      registration_source: 'default',
      option: JSON.stringify(['MOCKERY-TOS']),
      option_date: JSON.stringify([`MOCKERY-TOS| + ${new Date().getTime()}`])
    }
  };
  SURF.update(brandData);
}

export function registerUser() {
  const syncUrl = `${REGISTER_BASE}/auth/api/150/${SURF.globals.session.uid}/sync?opi=create`;
  // SURF uses this to create provider which is needed for pro users
  const bodyData = `meta=%7B%22session_token%22%3A%22${SURF.globals.session.session_token}%22%7D`;
  /*
    for this request to 200, user needs to have registered on a qa instance with .mockery in its url and
    where you registered from surf has to match the register url, i.e
    register-qa requires login through surf-qa, and so on...
    this should always return 200 provided that the api is not down
    in case it is down, we will somehow need to rely on the fetch made from fetchToken above and
    attempt to registerUser again but that is also not great...
  */
  return fetch(syncUrl, {
    timeout: 5000,
    method: 'POST',
    body: bodyData,
    headers: {
      "Content-Type": "text/plain",
    },
  })
  .then(response => {
    if(response.status === 200) {
      syncBrandData();
    }
  });
}

export function registerNewProUser(dispatch) {
  const syncUrl = `${REGISTER_BASE}/auth/api/152/${SURF.globals.user._provider.mockery}/sync?opi=subscription`;
  return fetch(syncUrl, {
    timeout: 5000,
    method: 'POST',
    headers: {
      "Content-Type": "text/plain",
    },
  })
  .then(response => {
    if (response.status === 200) {
      setTimeout( () => {
        SURF.getUserInfo();
      }, 750);
      setTimeout( () => {
        dispatch(isNewProUser(true));
      }, 2000);
    }
  });
}
