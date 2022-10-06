import { FETCH_PRODUCT_DATA_FAILURE, FETCH_PRODUCT_DATA_REQUEST, FETCH_PRODUCT_DATA_SUCCESS } from "./fetchProductData"

const initialState = {
    loading : false,
    data : [],
    error : ""
}

const productDataReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_PRODUCT_DATA_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_PRODUCT_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_PRODUCT_DATA_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default productDataReducer