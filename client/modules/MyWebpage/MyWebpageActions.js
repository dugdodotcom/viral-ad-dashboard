import callApi from '../../util/apiCaller';
import axiosClient from '../../util/axiosClient';

// Import environtment
import { ENV } from '../../../config/LocalEnvironment';

// for redirecting page
import { browserHistory } from 'react-router';

// Export Constants
export const SET_OBJECT = 'SET_OBJECT';
export const ADD_WEBPAGE = 'ADD_WEBPAGE';
export const ADD_CHOOSES = 'ADD_CHOOSES';

// Export Actions
export function setObject(object) {
  return {
    type: SET_OBJECT,
    object,
  };
}

export function addWebpage(webpage) {
  return {
    type: ADD_WEBPAGE,
    webpage,
  };
}

export function addWebpageRequest(webpage) {
  return (dispatch) => {
    axiosClient
      ['post'](`${ENV.apiVersion}/webpages`, 
      webpage)
      .then(response => {
        dispatch(addWebpage(response.data));
        alert("Success")
      })
      .catch(error => {
        
      });
  };
}

export function fetchWebpage(id) {
  return (dispatch) => {
    return callApi(
      `${ENV.apiVersion}/webpages`
    ).then(res => dispatch(addWebpage(res)));
  };
}

export function addChooses(chooses) {
  return {
    type: ADD_CHOOSES,
    chooses,
  };
}

export function fetchChooses() {
  return (dispatch) => {
    return callApi(
      `${ENV.apiVersion}/chooses`
    ).then(res => dispatch(addChooses(res)));
  };
}

export function editChooseRequest(id) {
  return (dispatch) => {
    return callApi(`${ENV.apiVersion}/chooses/${id}`, 'put').then(res => dispatch(addChooses(res)));
  };
}