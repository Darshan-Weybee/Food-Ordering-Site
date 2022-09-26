import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import CartReducer from "../AddToCart/AddToCartReducer";
import reducer from "./Reducer";

const rootReducer = combineReducers({
    product : reducer,
    cart : CartReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store