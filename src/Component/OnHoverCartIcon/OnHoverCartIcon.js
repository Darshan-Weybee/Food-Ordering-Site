import React, { useState } from "react";
import { connect } from "react-redux";
import { addItems } from "../../redux/reducer/addToCart/AddToCartReducer";
import CartPopup from "../CartPopUp/CartPopup";

function OnHoverCartIcon({ cartDispatch, data, quantity }) {
    const [isCartVisible, setIsCartVisible] = useState(false);

    const onClickCart = e => {
        e.preventDefault();
        setIsCartVisible(true);
        setTimeout(() => {
            setIsCartVisible(false);
        }, 1000)
        cartDispatch(data, quantity)
    }
    return (
        <>
            <div className="on-hover-cart" onClick={onClickCart}>
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
            {isCartVisible && <CartPopup/>}
        </>
    )

}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch: (data, quantity) => dispatch(addItems(data, quantity))
    }
}


export default connect(null, mapDispatchToProps)(OnHoverCartIcon)