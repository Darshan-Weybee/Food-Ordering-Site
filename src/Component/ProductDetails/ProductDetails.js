import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addItems } from "../AddToCart/AddToCartReducer";
import { addFavItems } from "../Favourite/FavouriteReducer";
import Loader from "../Loader/Loader";
import Popup from "../PopUp/Popup";
import FavPopup from "../FavPopUp/FavPopup"
import { addRecentItems } from "../Recent/RecentReducer";

function ProductDetails({cartDispatch, favDispatch, recentDispatch}){
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [favIsVisible, setFavIsVisible] = useState(false);

    useEffect(() => {
        fetch(`https://ig-food-menus.herokuapp.com/${params.type}/${params.id}`)
        .then(response => response.json())
        .then(res => {setData(res)
            recentDispatch(res, params.type);
        })
        .catch(error => console.error(error.message))
    },[params.id, params.type, recentDispatch])


    return (
        <div>
        <div className="productDetails flexRow">
            { data.name === undefined ? <div className="product-de-loader"><Loader/></div> : 
            <><div className="productDetails-img">
                <img src={data.img} alt="foodItem" onError={event => {
                            event.target.src = 'https://bookmychefs.com/uploads/dish/default_food.jpg'
                            event.onerror = null
                        }}/>
            </div>
            <div className="productDetails-content">
                <div className="productDetails-name">{data.name}</div>
                <div className="productDetails-dsc">{data.dsc}</div>
                <div className="productDetails-price"> $ {data.price}</div>
                <div className="productDetails-rate">{data.rate} <i className="fa-sharp fa-solid fa-star"></i></div>
                <div className="productDetails-buttons">
                    <button className="productDetails-nbtn" onClick={() => setQuantity(pst => pst === 1 ? 1 : pst - 1)}>-</button>
                    <span className="productDetails-quan">{quantity}</span>
                    <button className="productDetails-abtn" onClick={() => setQuantity(pst => pst + 1)}>+</button>
                </div>
                <div className="productDetails-cart">
                    <button className="productDetails-cart-btn" onClick={() => {
                        setIsVisible(true);
                        setTimeout(() => {
                            setIsVisible(false);
                        }, 1000)
                        cartDispatch(data, quantity)
                        }}>Add to Cart</button>
                    <button className="productDetails-cart-fav" onClick={() => {
                        setFavIsVisible(true);
                        setTimeout(() => {
                            setFavIsVisible(false);
                        }, 1000)
                        favDispatch(data)}}><i class="fa-regular fa-heart"></i></button>
                </div>
            </div></>}
        </div>
            {isVisible ? <Popup/> : ""}
            {favIsVisible ? <FavPopup/> : ""}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch : (data, quan) => dispatch(addItems(data, quan)),
        favDispatch : data => dispatch(addFavItems(data)),
        recentDispatch : (data,type) => dispatch(addRecentItems(data,type))
    }
}

export default connect(null, mapDispatchToProps)(ProductDetails)