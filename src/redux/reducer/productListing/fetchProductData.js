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

export const fetchProductData = (type,searchObj) => {
    if(!searchObj["_limit"]){
        searchObj = {_limit: 16, _page: 1};
}
    const urlString = new URLSearchParams(searchObj);

    return dispatch => {
        dispatch(fetchProductDataRequests());

        fetch(`https://ig-food-menus.herokuapp.com/${type}?${urlString}`)
        .then(response => response.json())
        .then(res => dispatch(fetchProductDataSuccess(res)))
        .catch(error => dispatch(fetchProductDataFailure(error.message)))
    }
}