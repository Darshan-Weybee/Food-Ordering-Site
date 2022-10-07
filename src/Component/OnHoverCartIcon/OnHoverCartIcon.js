import React, { useState } from "react";
import { connect } from "react-redux";
import { addItems } from "../../redux/reducer/addToCart/AddToCartReducer";
import CartPopup from "../CartPopUp/CartPopup";

function OnHoverCartIcon({ cartDispatch, data, quantity }) {
    const [isCartVisible, setIsCartVisible] = useState(false);
    return (
        <>
            <div className="product-hover-item-cart product-hover-effect-btn" onClick={e => onClickCart(setIsCartVisible, cartDispatch, e, data, quantity)}>
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
            {isCartVisible && <CartPopup />}
        </>
    )

}

const onClickCart = (setIsCartVisible, cartDispatch, e, data, quantity) => {
    e.preventDefault();
    setIsCartVisible(true);
    setTimeout(() => {
        setIsCartVisible(false);
    }, 1000)
    cartDispatch(data, quantity)
}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch: (data, quantity) => dispatch(addItems(data, quantity))
    }
}


export default connect(null, mapDispatchToProps)(OnHoverCartIcon)