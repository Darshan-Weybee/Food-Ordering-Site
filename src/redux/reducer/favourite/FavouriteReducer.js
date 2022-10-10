const initialState = [];
const ADD_FAV_ITEMS = "ADD_FAV_ITEMS";
const DELETE_FAV_ITEM = "DELETE_FAV_ITEM";

const FavouriteReducer = (state = initialState, action) => {
    let temp = JSON.parse(localStorage.getItem("fav"));
    temp = temp !== null ? temp : initialState;

    switch (action.type) {
        case ADD_FAV_ITEMS:

            let isThere = false;
            let lcData = [];

            temp = temp.map(st => {
                if (action.payload.id === st.data.id) {
                    isThere = true;
                    return {
                        data: action.payload
                    }
                }
                return st;
            })

            lcData = isThere ? temp : [...temp, { data: action.payload }]
            localStorage.setItem("fav", JSON.stringify(lcData));
            return lcData;

        case DELETE_FAV_ITEM:
            temp = temp.filter(st => st.data.id !== action.payload)
            localStorage.setItem("fav", JSON.stringify(temp));
            return temp;

        default: return temp;
    }
}

export function addFavItems(data) {
    return {
        type: ADD_FAV_ITEMS,
        payload: data
    }
}

export function deleteFavItem(dataId) {
    return {
        type: DELETE_FAV_ITEM,
        payload: dataId
    }
}

export default FavouriteReducer