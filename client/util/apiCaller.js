import fetch from 'isomorphic-fetch';
// import Config from '../../server/config';

// Import environtment
import { ENV } from '../../config/LocalEnvironment';

// For cookie get and set
import { getStorage, setStorage } from '../helpers/cookie';

import { browserHistory } from 'react-router';

// export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
//   process.env.BASE_URL || (`${ENV.apiUrl}${ENV.apiVersion}`) :
//   '/api';

export const API_URL = ENV.apiUrl;

export default function callApi(endpoint, method = 'get', body) {
  const authorization = getStorage('token');
  
  let fetchData = {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  }

  if (authorization) {
    fetchData.headers.Authorization = `Bearer ${authorization}`;
  }

  return fetch(`${API_URL}${endpoint}`, fetchData)
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    // only for login we need to get header information
    if (endpoint === 'login' && json.id) {
      json.authorization = response.headers.get('Authorization');
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );

}
