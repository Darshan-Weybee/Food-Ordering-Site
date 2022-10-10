const initialState = JSON.parse(localStorage.getItem("items")) || [];
console.log(JSON.parse(localStorage.getItem("items")));
const ADD_ITEMS = "ADD_ITEMS";
const DELETE_ITEM = "DELETE_ITEM";

const AddToCartReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD_ITEMS : 
        let isThere = false;
        let lcData = [];
        
        state = state.map(item => {
            if(action.payload.data.id === item.data.id){
                isThere = true;
                return {
                    ...action.payload,
                    quantity : action.payload.quantity
                }
            }
            return item;
        })

        lcData =  isThere ? state : [...state, {data : action.payload.data, quantity : action.payload.quantity}]
        // localStorage.setItem("items", JSON.stringify(lcData));
        return lcData;

        case DELETE_ITEM : 
            state =  state.filter(item => item.data.id !== action.payload)
            // localStorage.setItem("items", JSON.stringify(temp));
            return state;

        default :  return state;
    }
}

export function addItems(data, quant){
    return {
        type : ADD_ITEMS,
        payload : {data: data, quantity : quant}
    }
}

export function deleteItem(dataId){
    return{
        type : DELETE_ITEM,
        payload : dataId
    }
}

export default AddToCartReducer