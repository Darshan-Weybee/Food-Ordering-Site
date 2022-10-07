import { FETCH_TOTAL_NO_OF_ITEMS_FAILURE, FETCH_TOTAL_NO_OF_ITEMS_REQUEST, FETCH_TOTAL_NO_OF_ITEMS_SUCCESS } from "./fetchTotalItems"

const initialState = {
    loading : false,
    data : [],
    error : ""
}

const totalItemsReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_TOTAL_NO_OF_ITEMS_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_TOTAL_NO_OF_ITEMS_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_TOTAL_NO_OF_ITEMS_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default totalItemsReducer