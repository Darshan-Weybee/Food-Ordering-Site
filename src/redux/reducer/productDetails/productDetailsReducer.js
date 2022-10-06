import { FETCH_PRODUCT_DETAILS_FAILURE, FETCH_PRODUCT_DETAILS_REQUEST, FETCH_PRODUCT_DETAILS_SUCCESS } from "./fetchProductDetails"

const initialState = {
    loading : false,
    data : [],
    error : ""
}

const productDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_PRODUCT_DETAILS_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_PRODUCT_DETAILS_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_PRODUCT_DETAILS_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default productDetailsReducer