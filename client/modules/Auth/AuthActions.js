import callApi from '../../util/apiCaller';
import { errorForm } from '../Form/FormActions';

// Import environtment
import { ENV } from '../../../config/LocalEnvironment';

// For cookie get and set
import { setStorage, clearStorage } from '../../helpers/cookie';

// for redirecting page
import { browserHistory } from 'react-router';

// Export Constants
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

// Export Actions
export function submitLogin(login) {
  return {
    type: SUBMIT_LOGIN,
    login,
  };
}

export function loginRequest(input) {
  return (dispatch) => {
    return callApi('/oauth/token', 'post', {
      email: input.email,
      password: input.password,
      grant_type: "password",
    })
    .then(res => {
      // If error will send error to form
      if (res.error) {
        const error = {
          email: false,
          password: false,
        };
        if (res.error === 'Invalid Email or password.') {
          error.email = 'emailNotFound';
          error.password = 'passwordNotMatch';
        }
        dispatch(errorForm(error));
      } else {
        // redirect page for success login
        setStorage('token', res.access_token);
        browserHistory.push('/');
      }
    });
  };
}

export function logoutRequest(input) {
  return (dispatch) => {
    return callApi('/logout', 'delete')
    .then(res => {
      // redirect page for success login
      clearStorage('token');
      browserHistory.push('/auth/login');
    });
  };
}

export function signupRequest(input) {

  return (dispatch) => {
    return callApi(`${ENV.apiVersion}/signup`, 'post', {
      user: {
        email: input.email,
        password: input.password,
        mode: 1,
      },
    })
    .then(res => {
      // If error will send error to form
      if (res.errors) {
        const error = {
          email: false,
          password: false,
        };
        if (res.errors[0].detail.email){
          error.email = "alreadyTaken"
        }
        
        if (res.errors[0].detail.password){
          error.password = "passwordNotMatch"
        }

        dispatch(errorForm(error));
      } else {
        // redirect page for success login
        browserHistory.push('/auth/login');
      }
    });
  };
}
