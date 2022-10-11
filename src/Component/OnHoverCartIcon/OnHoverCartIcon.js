import React from "react";
import { connect } from "react-redux";
import { addItems } from "../../redux/reducer/addToCart/AddToCartReducer";
import { popupNotVisible, popupVisible } from "../../redux/reducer/popup/popupreducer";

function OnHoverCartIcon({ cartDispatch, data, quantity, popupHideDispatch, popupVisibleDispatch }) {

    const onClickCart = e => {
        e.preventDefault();
        popupVisibleDispatch("The product has been added to cart", "cart");
        setTimeout(() => {
            popupHideDispatch();
        }, 1000)
        cartDispatch(data, quantity);
    }
    return (
            <div className="on-hover-cart" onClick={onClickCart}>
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
    )

}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch: (data, quantity) => dispatch(addItems(data, quantity)),
        popupVisibleDispatch : (msg, type) => dispatch(popupVisible(msg, type)),
        popupHideDispatch : () => dispatch(popupNotVisible())
    }
}


export default connect(null, mapDispatchToProps)(OnHoverCartIcon)