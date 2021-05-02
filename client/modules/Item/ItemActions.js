import callApi from '../../util/apiCaller';

// for redirecting page
import { browserHistory } from 'react-router';

// Export Constants
export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEMS = 'ADD_ITEMS';
export const SET_ITEM = 'SET_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

// Export Actions
export function addItem(item) {
  return {
    type: ADD_ITEM,
    item,
  };
}

export function addItemRequest(item) {
  return (dispatch) => {
    return callApi(
      'items', 
      'post', 
      {
        name: item.name,
        category_id: item.category_id, 
        rate: item.rate, 
        quantity: item.quantity, 
        per: item.per
      }
    ).then(res => {
      dispatch(addItem(res));
      browserHistory.push('/inventory/item');
    });
  };
}

export function addItems(items) {
  console.log(items)
  return {
    type: ADD_ITEMS,
    items,
  };
}

export function fetchItems() {
  return (dispatch) => {
    return callApi(
      'items'
    ).then(res => {
      dispatch(addItems(res));
    });
  };
}

export function fetchItem(id) {
  return (dispatch) => {
    return callApi(
      `items/${id}`
    ).then(res => dispatch(addItem(res)));
  };
}

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    id,
  };
}

export function deleteItemRequest(id) {
  return (dispatch) => {
    return callApi(
      `items/${id}`, 
      'delete'
    ).then(() => dispatch(deleteItem(id)));
  };
}

export function setItem(item) {
  return {
    type: SET_ITEM,
    item,
  };
}

export function modifyItemRequest(item, id) {
  return (dispatch) => {
    return callApi(
      `items/${id}`, 
      'put', {
        name: item.name,
        category_id: item.category_id, 
        rate: item.rate, 
        quantity: item.quantity, 
        per: item.per
      }
    ).then((res) => {
      dispatch(setItem(res));
      browserHistory.push('/inventory/item');
    });
  };
}