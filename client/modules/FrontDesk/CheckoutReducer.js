import { ADD_CHECKOUTS } from './CheckoutActions';

// Initial State
const initialState = { data: [] };

const CheckoutReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_CHECKOUTS :
      return {
        data: action.checkouts,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getCheckoutLists = state => state.checkouts.data;

// Export Reducer
export default CheckoutReducer;
