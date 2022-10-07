import { combineReducers } from "redux";
import AddToCartReducer from "../reducer/addToCart/AddToCartReducer";
import FavouriteReducer from "../reducer/favourite/FavouriteReducer";
import RecentReducer from "../reducer/recent/RecentReducer";
import productDataReducer from "../reducer/productListing/productDataReducer";
import productDetailsReducer from "../reducer/productDetails/productDetailsReducer";
import totalItemsReducer from "../reducer/totalItems/totalItemsReducer";
import bestFoodDataReducer from "../reducer/bestFoodData/bestFoodDataReducer";

export const rootReducer = combineReducers({
    productList : productDataReducer,
    productDetails : productDetailsReducer,
    cart : AddToCartReducer,
    favourite : FavouriteReducer,
    recent : RecentReducer,
    totalItems : totalItemsReducer,
    bestFood : bestFoodDataReducer
})