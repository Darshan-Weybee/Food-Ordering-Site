export const FETCH_TOTAL_NO_OF_ITEMS_REQUEST = "FETCH_TOTAL_NO_OF_ITEMS_REQUEST";
export const FETCH_TOTAL_NO_OF_ITEMS_SUCCESS = "FETCH_TOTAL_NO_OF_ITEMS_SUCCESS";
export const FETCH_TOTAL_NO_OF_ITEMS_FAILURE = "FETCH_TOTAL_NO_OF_ITEMS_FAILURE";

const fetchTotalNoOfItemsRequests = () => {
    return {
        type: FETCH_TOTAL_NO_OF_ITEMS_REQUEST
    }
}

const fetchTotalNoOfItemsSuccess = data => {
    return {
        type: FETCH_TOTAL_NO_OF_ITEMS_SUCCESS,
        payload: data
    }
}

const fetchTotalNoOfItemsFailure = error => {
    return {
        type: FETCH_TOTAL_NO_OF_ITEMS_FAILURE,
        payload: error
    }
}

export const fetchTotalNoOfItems = () => {
    return dispatch => {
        dispatch(fetchTotalNoOfItemsRequests());

        fetch(`https://ig-food-menus.herokuapp.com/pagination`)
        .then(response => response.json())
        .then(res => dispatch(fetchTotalNoOfItemsSuccess(res)))
        .catch(error => dispatch(fetchTotalNoOfItemsFailure(error.message)))
    }
}