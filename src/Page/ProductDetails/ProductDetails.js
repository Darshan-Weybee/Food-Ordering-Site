import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addItems } from "../../redux/reducer/addToCart/AddToCartReducer";
import { addFavItems } from "../../redux/reducer/favourite/FavouriteReducer";
import Loader from "../../Component/Loader/Loader";
import Popup from "../../Component/PopUp/Popup";
import FavPopup from "../../Component/FavPopUp/FavPopup"
import { addRecentItems } from "../../redux/reducer/recent/RecentReducer";
import { fetchProductDetails } from "../../redux/reducer/productDetails/fetchProductDetails";

function ProductDetails({ productInfo, cartDispatch, favDispatch, recentDispatch, productDetailsDispatch }) {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [favIsVisible, setFavIsVisible] = useState(false);

    useEffect(() => {
        productDetailsDispatch(params.type, params.id);
    }, [params.id, params.type, productDetailsDispatch])

    useEffect(() => {
        recentDispatch(productInfo.data, params.type);
    },[params.type, productInfo.data, recentDispatch])


    return (
        <div>
            {productInfo.loading && <Loader />}
            {productInfo.data &&
                <div className="productDetails flexRow">
                    <div className="productDetails-img">
                        <img src={productInfo.data.img} alt="foodItem" onError={event => {
                            event.target.src = 'https://bookmychefs.com/uploads/dish/default_food.jpg'
                            event.onerror = null
                        }} />
                    </div>
                    <div className="productDetails-content">
                        <div className="productDetails-name">{productInfo.data.name}</div>
                        <div className="productDetails-dsc">{productInfo.data.dsc}</div>
                        <div className="productDetails-price"> $ {productInfo.data.price}</div>
                        <div className="productDetails-rate">{productInfo.data.rate} <i className="fa-sharp fa-solid fa-star"></i></div>
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
                                cartDispatch(productInfo.data, quantity)
                            }}>Add to Cart</button>
                            <button className="productDetails-cart-fav" onClick={() => {
                                setFavIsVisible(true);
                                setTimeout(() => {
                                    setFavIsVisible(false);
                                }, 1000)
                                favDispatch(productInfo.data)
                            }}><i class="fa-regular fa-heart"></i></button>
                        </div>
                    </div>
                </div>}
            {isVisible ? <Popup /> : ""}
            {favIsVisible ? <FavPopup /> : ""}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        productInfo: state.productDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        productDetailsDispatch: (type, id) => dispatch(fetchProductDetails(type, id)),
        cartDispatch: (data, quan) => dispatch(addItems(data, quan)),
        favDispatch: data => dispatch(addFavItems(data)),
        recentDispatch: (data, type) => dispatch(addRecentItems(data, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)