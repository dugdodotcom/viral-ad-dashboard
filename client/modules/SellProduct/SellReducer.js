import {
  ADD_LINK,
} from './SellActions'

// Initial State
const initialState = { 
  links: [{}],
  performances: [],
}

const EcommerceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LINK:
      return {
        ...state, links: [action.link, ...state.links],
      };

    default:
      return state
  }
}

/* Selectors */

export const getLinks = state => state.sells.links
export const getPerformances = state => state.sells.performances

// Export Reducer
export default EcommerceReducer
