import {
  ADD_SALES_BY_DAYS,
} from './PerformanceReportActions'

// Initial State
const initialState = { 
  salesByDays: [],
}

const MyPerformanceReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_SALES_BY_DAYS:
      return {
        ...state, salesByDays: action.salesByDays,
      };

    default:
      return state
  }
}

/* Selectors */

export const getSalesByDays = state => state.performances.salesByDays

// Export Reducer
export default MyPerformanceReducer
