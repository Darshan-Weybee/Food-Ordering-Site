import { combineReducers } from "redux";
import AddToCartReducer from "../reducer/addToCart/AddToCartReducer";
import FavouriteReducer from "../reducer/favourite/FavouriteReducer";
import RecentReducer from "../reducer/recent/RecentReducer";
import productDataReducer from "../reducer/productListing/productDataReducer";
import productDetailsReducer from "../reducer/productDetails/productDetailsReducer";
import bestFoodDataReducer from "../reducer/bestFoodData/bestFoodDataReducer";
import dataCountReducer from "../reducer/dataCounter/dataCountReducer";
import popupReducer from "../reducer/popup/popupreducer";

export const rootReducer = combineReducers({
    productList : productDataReducer,
    productDetails : productDetailsReducer,
    cart : AddToCartReducer,
    favourite : FavouriteReducer,
    recent : RecentReducer,
    bestFood : bestFoodDataReducer,
    totalData : dataCountReducer,
    popup : popupReducer
})