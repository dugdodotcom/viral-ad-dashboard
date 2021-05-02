import callApi from '../../util/apiCaller';

// Import environtment
import { ENV } from '../../../config/LocalEnvironment';

// for redirecting page
import { browserHistory } from 'react-router';

// Export Constants
export const ADD_LINK = 'ADD_LINK';

// Export Actions
export function addLink(link) {
  return {
    type: ADD_LINK,
    link,
  };
}

export function addPayoutRequest(link, id) {
  return (dispatch) => {
    return callApi(
      `${ENV.apiVersion}/links`, 
      'post', 
      {
        link: {
          links_attributes: link.links
        },
        
      }
    ).then(res => {
      // dispatch(addCategory(res));
      browserHistory.push('/sell');
    });
  };
}
