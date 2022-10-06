const initialState = [];
let isThere = false;
let lcData = [];

const AddToCartReducer = (state = initialState, action) => {
    
    isThere = false;
    let temp = JSON.parse(localStorage.getItem("items"));
    temp = temp !== null ? temp : initialState;

    switch(action.type){
        case "ADD_ITEMS" : 
        
        temp = temp.map(st => {
            if(action.payload.id === st.data.id){
                isThere = true;
                return {
                    data : action.payload,
                    quantity : action.quantity
                }
            }
            return st;
        })

        lcData =  isThere ? temp : [...temp, {data : action.payload, quantity : action.quantity}]
        localStorage.setItem("items", JSON.stringify(lcData));
        return lcData;

        case "DELETE_ITEM" : 
            temp =  temp.filter(st => st.data.id !== action.payload.id)
            localStorage.setItem("items", JSON.stringify(temp));
            return temp;

        default :  return temp;
    }
}

export function addItems(data, quant){
    return {
        type : "ADD_ITEMS",
        payload : data,
        quantity : quant
    }
}

export function deleteItem(data){
    return{
        type : "DELETE_ITEM",
        payload : data
    }
}

export default AddToCartReducer