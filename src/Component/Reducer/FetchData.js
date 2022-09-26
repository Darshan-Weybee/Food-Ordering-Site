export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

const fetchDataRequests = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}

const fetchDataSuccess = data => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

const fetchDataFailure = error => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}

export const fetchData = (url) => {
    return dispatch => {
        dispatch(fetchDataRequests());

        fetch(url)
        .then(response => response.json())
        .then(res => dispatch(fetchDataSuccess(res)))
        .catch(error => dispatch(fetchDataFailure(error.message)))
    }
}