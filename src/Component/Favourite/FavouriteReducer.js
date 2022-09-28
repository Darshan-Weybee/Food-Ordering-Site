const initialState = [];
let isThere = false;
let lcData = [];

const FavouriteReducer = (state = initialState, action) => {
    isThere = false;
    let temp = JSON.parse(localStorage.getItem("fav"));
    temp = temp !== null ? temp : initialState;
    
    switch(action.type){
        case "ADD_FAV_ITEMS" : 
        
        temp = temp.map(st => {
            if(action.payload.id === st.data.id){
                isThere = true;
                return {
                    data : action.payload
                }
            }
            return st;
        })

        lcData =  isThere ? temp : [...temp, {data : action.payload}]
        localStorage.setItem("fav", JSON.stringify(lcData));
        return lcData;

        case "DELETE_FAV_ITEM" : 
            temp =  temp.filter(st => st.data.id !== action.payload.id)
            localStorage.setItem("fav", JSON.stringify(temp));
            return temp;

        default : return temp;
    }
}

export function addFavItems(data){
    return {
        type : "ADD_FAV_ITEMS",
        payload : data
    }
}

export function deleteFavItem(data){
    return{
        type : "DELETE_FAV_ITEM",
        payload : data
    }
}

export default FavouriteReducer