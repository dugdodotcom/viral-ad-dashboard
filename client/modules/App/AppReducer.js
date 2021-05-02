// Import Actions
import { TOGGLE_ADD_POST, ADD_USER } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  user: {},
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
    
    case ADD_USER:
      return {
        user: action.user,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Get user
export const getUser = (state) => {
  console.log(state.app)
  return state.app.user
};

// Export Reducer
export default AppReducer;
