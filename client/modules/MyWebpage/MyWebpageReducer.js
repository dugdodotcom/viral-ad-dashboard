import {
  SET_OBJECT,
  ADD_WEBPAGE,
  ADD_CHOOSES,
} from './MyWebpageActions'

// Initial State
const initialState = { 
  setup: {},
  chooses: [],
}

const MyWebpageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OBJECT:
      return {
        ...state, setup: {...state.setup, [`${action.object.key}`]: action.object.value},
      };

    case ADD_WEBPAGE:
      return {
        ...state, setup: action.webpage,
      };

    case ADD_CHOOSES:
      return {
        ...state, chooses: action.chooses,
      };

    default:
      return state
  }
}

/* Selectors */

export const getSetup = state => state.webpages.setup
export const getChooses = state => state.webpages.chooses

// Export Reducer
export default MyWebpageReducer
