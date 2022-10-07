export const FETCH_BEST_FOOD_DATA_REQUEST = "FETCH_BEST_FOOD_DATA_REQUEST";
export const FETCH_BEST_FOOD_DATA_SUCCESS = "FETCH_BEST_FOOD_DATA_SUCCESS";
export const FETCH_BEST_FOOD_DATA_FAILURE = "FETCH_BEST_FOOD_DATA_FAILURE";

const fetchBestFoodDataRequests = () => {
    return {
        type: FETCH_BEST_FOOD_DATA_REQUEST
    }
}

const fetchBestFoodDataSuccess = data => {
    return {
        type: FETCH_BEST_FOOD_DATA_SUCCESS,
        payload: data
    }
}

const fetchBestFoodDataFailure = error => {
    return {
        type: FETCH_BEST_FOOD_DATA_FAILURE,
        payload: error
    }
}

export const fetchBestFoodData = () => {
    return dispatch => {
        dispatch(fetchBestFoodDataRequests());

        fetch(`https://ig-food-menus.herokuapp.com/best-foods?_limit=8`)
        .then(response => response.json())
        .then(res => dispatch(fetchBestFoodDataSuccess(res)))
        .catch(error => dispatch(fetchBestFoodDataFailure(error.message)))
    }
}