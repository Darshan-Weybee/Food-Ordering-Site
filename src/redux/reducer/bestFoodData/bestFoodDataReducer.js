import { FETCH_BEST_FOOD_DATA_FAILURE, FETCH_BEST_FOOD_DATA_REQUEST, FETCH_BEST_FOOD_DATA_SUCCESS } from "./fetchBestFoodData"

const initialState = {
    loading : false,
    data : [],
    error : ""
}

const bestFoodDataReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_BEST_FOOD_DATA_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_BEST_FOOD_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_BEST_FOOD_DATA_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default bestFoodDataReducer