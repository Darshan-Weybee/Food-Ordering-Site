import React from "react";
import { connect } from "react-redux";
import CartInformation from "../../Component/CartInformation/CartInformation";
import Image from "../../Component/Image/Image";

function AddToCart({ cartData }) {

    const TotalAmount = () => {
        let total = cartData.reduce((ac, unit) => ac + (unit.data.price * unit.quantity), 0);

        return <div className="addToCart-total">
            <div>
                <span className="addToCart-item-title">Grand Total : </span>
                <span className="addToCart-total-amount">$ {total}</span>
            </div>
        </div>
    }

    return (
        <div className="addToCart">
            {+cartData.length === 0 && <EmptyCart />}
            {+cartData.length !== 0 && <CartInformation/>}
            {+cartData.length !== 0 && <TotalAmount/>}
        </div>
    )
}

const EmptyCart = () => {
    return <div className="empty-cart">
        <div className="empty-cart-img">
            <Image path="https://food-g-app.web.app/static/media/empty-cart.f9db2821.svg" />
        </div>
        <h2 className="empty-cart-text">Your cart  is empty 🍔</h2>
    </div>
}

const mapStateToProps = state => {
    return {
        cartData: state.cart
    }
}

export default connect(mapStateToProps)(AddToCart)