export const FETCH_PRODUCT_DATA_REQUEST = "FETCH_PRODUCT_DATA_REQUEST";
export const FETCH_PRODUCT_DATA_SUCCESS = "FETCH_PRODUCT_DATA_SUCCESS";
export const FETCH_PRODUCT_DATA_FAILURE = "FETCH_PRODUCT_DATA_FAILURE";

const fetchProductDataRequests = () => {
    return {
        type: FETCH_PRODUCT_DATA_REQUEST
    }
}

const fetchProductDataSuccess = data => {
    return {
        type: FETCH_PRODUCT_DATA_SUCCESS,
        payload: data
    }
}

const fetchProductDataFailure = error => {
    return {
        type: FETCH_PRODUCT_DATA_FAILURE,
        payload: error
    }
}

export const fetchProductData = (type, limit, currentPage) => {
    return dispatch => {
        dispatch(fetchProductDataRequests());

        fetch(`https://ig-food-menus.herokuapp.com/${type}?_limit=${limit}&_page=${currentPage}`)
        .then(response => response.json())
        .then(res => dispatch(fetchProductDataSuccess(res)))
        .catch(error => dispatch(fetchProductDataFailure(error.message)))
    }
}