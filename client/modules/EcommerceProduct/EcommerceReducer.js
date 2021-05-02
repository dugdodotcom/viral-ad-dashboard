import {
  SET_IMAGE,
  FORM_PROGRESS,
  FORM_COMPLETE,
  IS_SUBMITTING_FORM,
  TOGGLE_SHIPPING,
  TOGGLE_CHARGE,
  ADD_PRODUCT,
  ADD_PRODUCTS,
  DELETE_PRODUCT,
  SET_PRODUCT
} from './EcommerceActions'

// Initial State
const initialState = { 
  images: [],
  formProgress: 0,
  formComplete: false,
  isSubmittingForm: false,
  shipping: false,
  charge: false,
  imageChange: false,
  products: [],
}

const EcommerceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      return { ...state, images: action.images, imageChange: !state.imageChange }
    
    case FORM_PROGRESS:
      return { ...state, formProgress: action.formProgress }
    
    case FORM_COMPLETE:
      return { ...state, formComplete: action.formComplete }

    case IS_SUBMITTING_FORM:
      return { ...state, isSubmittingForm: action.isSubmittingForm }

    case TOGGLE_SHIPPING:
      return {
        ...state, shipping: !state.shipping,
      };

    case TOGGLE_CHARGE:
      return {
        ...state, charge: !state.charge,
      };

    case ADD_PRODUCT:
      return {
        ...state, products: [action.product, ...state.products],
      };

    case ADD_PRODUCTS:
      return {
        ...state, products: action.products,
      };

    case SET_PRODUCT:
      const updatedIndex = state.products.findIndex(
        product => product.id == action.product.id
      )
      console.log(state.products)
      console.log(action.product)
      console.log("index", updatedIndex)
      return {
        ...state,
        products: [
          ...state.products.slice(0, updatedIndex),
          action.product,
          ...state.products.slice(updatedIndex + 1)
        ]
      }

    case DELETE_PRODUCT :
      return {
        ...state, products: state.products.filter(product => product.id !== action.id),
      };

    default:
      return state
  }
}

/* Selectors */

// Get all images
export const getImages = (state) => {
  console.log("image", state.ecommerces.images);
  return state.ecommerces.images
}
export const getFormProgress = state => state.ecommerces.formProgress
export const getFormComplete = state => state.ecommerces.formComplete
export const getIsSubmittingForm = state => state.ecommerces.isSubmittingForm
export const getShipping = state => state.ecommerces.shipping
export const getCharge = state => state.ecommerces.charge

export const getProducts = state => {
  console.log("get products")
  return state.ecommerces.products
}

export const getProduct = (state, id) => state.ecommerces.products.filter(product => product.id == id)[0]


export const getImageChanges = state => state.ecommerces.imageChange

// Export Reducer
export default EcommerceReducer
