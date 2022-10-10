const initialState = JSON.parse(localStorage.getItem("recent")) || [];
console.log(JSON.parse(localStorage.getItem("recent")));
const ADD_RECENT_ITEMS = "ADD_RECENT_ITEMS";

const RecentReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_RECENT_ITEMS:
            let isThere = false;
            let lcData = [];

            state = state.map(item => {

                if (action.payload.data.id === item.data.id) {
                    isThere = true;
                    return {
                        ...action.payload,
                        num: item.num + 1
                    }
                }
                return item;
            })
            lcData = isThere ? state : [...state, { data: action.payload.data, typeOfItem: action.payload.typeOfItem, num: 1}]
            // localStorage.setItem("recent", JSON.stringify(lcData));
            return lcData;

        default: return state;
    }
}

export function addRecentItems(data, type) {
    return {
        type: ADD_RECENT_ITEMS,
        payload: {data: data, typeOfItem: type}
    }
}

export default RecentReducer