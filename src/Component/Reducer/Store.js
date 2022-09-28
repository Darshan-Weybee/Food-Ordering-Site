import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import CartReducer from "../AddToCart/AddToCartReducer";
import FavouriteReducer from "../Favourite/FavouriteReducer";
import RecentReducer from "../Recent/RecentReducer";
import reducer from "./Reducer";

const rootReducer = combineReducers({
    product : reducer,
    cart : CartReducer,
    fav : FavouriteReducer,
    recent : RecentReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store