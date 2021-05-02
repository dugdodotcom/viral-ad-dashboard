import callApi from '../../util/apiCaller';

import { ENV } from '../../../config/LocalEnvironment';

// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const ADD_USER = 'ADD_USER';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function fetchUser() {
  return (dispatch) => {
    return callApi(
      `${ENV.apiVersion}/users/me`
    ).then(res => {
      dispatch(addUser(res));
    });
  };
}