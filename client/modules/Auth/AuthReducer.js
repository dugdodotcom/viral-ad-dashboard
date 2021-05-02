// Import Actions
import { SUBMIT_LOGIN, SUBMIT_SIGNUP } from './AuthActions';

// Initial State
const initialState = {
  login: {},
  signup: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        login: action.login,
      };

    case SUBMIT_SIGNUP:
      return {
        signup: action.signup,
      };  

    default:
      return state;
  }
};

/* Selectors */

// Get errorForm
export const getLogin = state => state.auth.login;

// Get errorForm
export const getSignup = state => state.auth.signup;

// Export Reducer
export default AuthReducer;
