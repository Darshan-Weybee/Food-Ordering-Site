import React from "react";
import { connect } from "react-redux";
import Image from "../../Component/Image/Image";
import { addItems, deleteItem } from "../../redux/reducer/addToCart/AddToCartReducer";

function AddToCart({ cartData, cartDispatch, deleteDispatch }) {

    return (
        <div className="addToCart">
            {+cartData.length === 0 && <EmptyCart />}
            {+cartData.length !== 0 && <CartInformation cartData={cartData} cartDispatch={cartDispatch} deleteDispatch={deleteDispatch} />}
            <div className="addToCart-total">
                <div>
                    <span className="addToCart-item-title">Grand Total : </span>
                    <span className="addToCart-total-amount">$ {totalAmount(cartData)}</span>
                </div>
            </div>
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

const CartInformation = ({ cartData, cartDispatch, deleteDispatch }) => {
    return cartData.map((unit, index) => {
        return <div key={index} className="addToCart-item flexRow">
            <div className="addToCart-item-img">
                <Image path={unit.data.img}/>
            </div>
            <div className="addToCart-item-content">
                <div className="addToCart-item-name">{unit.data.name}</div>
                <div className="addToCart-item-dsc">{unit.data.dsc}</div>
                <div className="addToCart-item-price"> $ {unit.data.price}</div>
                <div className="addToCart-item-rate">{unit.data.rate}  <i className="fa-sharp fa-solid fa-star"></i></div>
                <div className="addToCart-item-buttons">
                    <button className="addToCart-item-nbtn" onClick={() => quantityDecrease(unit, cartDispatch)}>-</button>
                    <span className="addToCart-item-quan">{unit.quantity}</span>
                    <button className="addToCart-item-abtn" onClick={() => quantityIncrease(unit, cartDispatch)}>+</button>
                </div>
                <div className="addToCart-item-delete">
                    <button onClick={() => deleteDispatch(unit.data)}>Delete</button>
                </div>
            </div>
        </div>
    })
}

const quantityDecrease = (unit, cartDispatch) => {
    cartDispatch(unit.data, unit.quantity === 1 ? 1 : unit.quantity - 1)
}

const quantityIncrease = (unit, cartDispatch) => {
    cartDispatch(unit.data, unit.quantity + 1)
}

const totalAmount = dataLocal => {
    let total = dataLocal.reduce((ac, unit) => ac + (unit.data.price * unit.quantity), 0);
    return total;
}

const mapStateToProps = state => {
    return {
        cartData: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch: (data, quan) => dispatch(addItems(data, quan)),
        deleteDispatch: data => dispatch(deleteItem(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)