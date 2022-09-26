const initialState = [];

const CartReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_ITEMS" : return [
            ...state,
            {
                data : action.payload,
                quantity : action.quantity
            }
        ]

        default : return state
    }
}

export function addItems(data, quant){
    return {
        type : "ADD_ITEMS",
        payload : data,
        quantity : quant
    }
}

export default CartReducer