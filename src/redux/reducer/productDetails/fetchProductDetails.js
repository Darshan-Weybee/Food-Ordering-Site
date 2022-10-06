export const FETCH_PRODUCT_DETAILS_REQUEST = "FETCH_PRODUCT_DETAILS_REQUEST";
export const FETCH_PRODUCT_DETAILS_SUCCESS = "FETCH_PRODUCT_DETAILS_SUCCESS";
export const FETCH_PRODUCT_DETAILS_FAILURE = "FETCH_PRODUCT_DETAILS_FAILURE";

const fetchProductDetailsRequests = () => {
    return {
        type: FETCH_PRODUCT_DETAILS_REQUEST
    }
}

const fetchProductDetailsSuccess = data => {
    return {
        type: FETCH_PRODUCT_DETAILS_SUCCESS,
        payload: data
    }
}

const fetchProductDetailsFailure = error => {
    return {
        type: FETCH_PRODUCT_DETAILS_FAILURE,
        payload: error
    }
}

export const fetchProductDetails = (type, id) => {
    return dispatch => {
        dispatch(fetchProductDetailsRequests());

        fetch(`https://ig-food-menus.herokuapp.com/${type}/${id}`)
        .then(response => response.json())
        .then(res => dispatch(fetchProductDetailsSuccess(res)))
        .catch(error => dispatch(fetchProductDetailsFailure(error.message)))
    }
}