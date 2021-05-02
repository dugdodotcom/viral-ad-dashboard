import callApi from '../../util/apiCaller';

// Import environtment
import { ENV } from '../../../config/LocalEnvironment';

// Export Constants
export const ADD_SALES_BY_DAYS = 'ADD_SALES_BY_DAYS';

// Export Actions
export function addSalesByDays(salesByDays) {
  return {
    type: ADD_SALES_BY_DAYS,
    salesByDays,
  };
}

export function fetchSalesByDays(id) {
  return (dispatch) => {
    return callApi(
      `${ENV.apiVersion}/performances/sales_by_days`
    ).then(res => dispatch(addSalesByDays(res)));
  };
}
