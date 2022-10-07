import { FETCH_DATA_COUNT_FAILURE, FETCH_DATA_COUNT_REQUEST, FETCH_DATA_COUNT_SUCCESS } from "./fetchDataForCount"

const initialState = {
    loading : false,
    data : [],
    error : ""
}

const dataCountReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_DATA_COUNT_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_DATA_COUNT_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_DATA_COUNT_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default dataCountReducer