import axiosClient from '../../util/axiosClient';
import callApi from '../../util/apiCaller';

// Import environtment
import { ENV } from '../../../config/LocalEnvironment';

// For cookie get and set
import { getStorage } from '../../helpers/cookie';

// for redirecting page
import { browserHistory } from 'react-router';

// Export Constants
export const SET_IMAGE = 'SET_IMAGE';
export const FORM_PROGRESS = 'FORM_PROGRESS';
export const FORM_COMPLETE = 'FORM_COMPLETE';
export const IS_SUBMITTING_FORM = 'IS_SUBMITTING_FORM';
export const TOGGLE_SHIPPING = 'TOGGLE_SHIPPING';
export const TOGGLE_CHARGE = 'TOGGLE_CHARGE';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

// Export Actions

export function setImage(images) {
  return {
    type: SET_IMAGE,
    images
  }
}

export function formProgress(formProgress) {
  return {
    type: FORM_PROGRESS,
    formProgress
  }
}

export function formComplete(formComplete) {
  return {
    type: FORM_COMPLETE,
    formComplete
  }
}

export function isSubmittingForm(isSubmittingForm) {
  return {
    type: IS_SUBMITTING_FORM,
    isSubmittingForm
  }
}

export function toggleShipping() {
  return {
    type: TOGGLE_SHIPPING,
  };
}

export function toggleCharge() {
  return {
    type: TOGGLE_CHARGE,
  };
}

export function addProductRequest(product, redirectUrl = "/ecommerce") {
  for (var pair of product.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }
  return (dispatch) => {
    dispatch(isSubmittingForm(true));
    axiosClient
      ['post'](`${ENV.apiVersion}/products`, 
      product, 
      {
        headers: {
          Authorization: `Bearer ${getStorage('token')}`
        }
      },
      {
        onUploadProgress: progressEvent => {
          let percentage = progressEvent.loaded * 100.0 / progressEvent.total;
          dispatch(formProgress(percentage));
        }
      })
      .then(response => {
        dispatch(isSubmittingForm(false));
        dispatch(formProgress(true));
        dispatch(addProduct(response.data));
        browserHistory.push(redirectUrl);
      })
      .catch(error => {
        dispatch(isSubmittingForm(false));
        dispatch(formProgress(0));
      });
  };
}

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}

export function fetchProducts() {
  return (dispatch) => {
    return callApi(
      `${ENV.apiVersion}/products`
    ).then(res => {
      dispatch(addProducts(res));
    });
  };
}

export function fetchGlobalProducts() {
  return (dispatch) => {
    return callApi(
      `${ENV.apiVersion}/products/global`
    ).then(res => {
      dispatch(addProducts(res));
    });
  };
}

export function deleteProduct(id) {
  return {
    type: DELETE_PRODUCT,
    id,
  };
}

export function deleteProductRequest(id) {
  return (dispatch) => {
    return callApi(`${ENV.apiVersion}/products/${id}`, 'delete').then(() => dispatch(deleteProduct(id)));
  };
}

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function fetchProduct(id) {
  return (dispatch) => {
    return callApi(
      `${ENV.apiVersion}/products/${id}`
    ).then(res => {
      dispatch(addProduct(res));
      dispatch(setImage(res.product_images_images));
    });
  };
}

export function setProduct(product) {
  return {
    type: SET_PRODUCT,
    product,
  };
}

export function modifyProductRequest(product, id) {
  return (dispatch) => {
    dispatch(isSubmittingForm(true));
    axiosClient
      ['put'](`${ENV.apiVersion}/products/${id}`, 
      product, {
        onUploadProgress: progressEvent => {
          let percentage = progressEvent.loaded * 100.0 / progressEvent.total;
          dispatch(formProgress(percentage));
        }
      })
      .then(response => {
        dispatch(isSubmittingForm(false));
        dispatch(formProgress(true));
        dispatch(setProduct(response.data));
        console.log("redirect");
        browserHistory.push('/ecommerce');
      })
      .catch(error => {
        dispatch(isSubmittingForm(false));
        dispatch(formProgress(0));
      });
  };
}