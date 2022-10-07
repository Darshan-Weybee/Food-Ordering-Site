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

export const fetchProductData = (type,parameter) => {
    if(parameter === "")
        parameter = "_limit=16&_page=1";

    console.log(parameter);
    return dispatch => {
        dispatch(fetchProductDataRequests());

        fetch(`https://ig-food-menus.herokuapp.com/${type}?${parameter}`)
        .then(response => response.json())
        .then(res => dispatch(fetchProductDataSuccess(res)))
        .catch(error => dispatch(fetchProductDataFailure(error.message)))
    }
}