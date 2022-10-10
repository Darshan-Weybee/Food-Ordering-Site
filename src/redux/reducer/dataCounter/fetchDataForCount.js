export const FETCH_DATA_COUNT_REQUEST = "FETCH_DATA_COUNT_REQUEST";
export const FETCH_DATA_COUNT_SUCCESS = "FETCH_DATA_COUNT_SUCCESS";
export const FETCH_DATA_COUNT_FAILURE = "FETCH_DATA_COUNT_FAILURE";

const fetchDataCountRequests = () => {
    return {
        type: FETCH_DATA_COUNT_REQUEST
    }
}

const fetchDataCountSuccess = data => {
    return {
        type: FETCH_DATA_COUNT_SUCCESS,
        payload: data
    }
}

const fetchDataCountFailure = error => {
    return {
        type: FETCH_DATA_COUNT_FAILURE,
        payload: error
    }
}

export const fetchDataForCount = (type, searchObj) => {
    delete searchObj["_limit"];
    delete searchObj["_page"];

    const urlString = new URLSearchParams(searchObj);

    return dispatch => {
        dispatch(fetchDataCountRequests());

       fetch(`https://ig-food-menus.herokuapp.com/${type}?${urlString}`)
        .then(response => response.json())
        .then(res => dispatch(fetchDataCountSuccess(res)))
        .catch(error => dispatch(fetchDataCountFailure(error.message)))
    }
}