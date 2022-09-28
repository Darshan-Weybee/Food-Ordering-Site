import React from "react";
import { connect } from "react-redux";
import { addItems, deleteItem } from "./AddToCartReducer";

function AddToCart({ cartData, cartDispatch, deleteDispatch }) {

    return (
            <div className="addToCart">
                {
                    cartData.length === 0 ?
                    <div className="empty-cart">
                        <div className="empty-cart-img"><img src="https://food-g-app.web.app/static/media/empty-cart.f9db2821.svg" alt="cart-empty"/></div>
                        <h2 className="empty-cart-text">Your cart  is empty 🍔</h2>
                    </div> :
                    cartData.map((cd, index) => {
                        return <div key={index} className="addToCart-item flexRow">
                            <div className="addToCart-item-img">
                                <img src={cd.data.img} alt="cartFood" onError={event => {
                                event.target.src = 'https://bookmychefs.com/uploads/dish/default_food.jpg'
                                event.onerror = null
                            }}/>
                            </div>
                            <div className="addToCart-item-content">
                                <div className="addToCart-item-name">{cd.data.name}</div>
                                <div className="addToCart-item-dsc">{cd.data.dsc}</div>
                                <div className="addToCart-item-price"> $ {cd.data.price}</div>
                                <div className="addToCart-item-rate">{cd.data.rate}  <i className="fa-sharp fa-solid fa-star"></i></div>
                            <div className="addToCart-item-buttons">
                                <button className="addToCart-item-nbtn" onClick={() => cartDispatch(cd.data, cd.quantity === 1 ? 1 : cd.quantity - 1)}>-</button>
                                <span className="addToCart-item-quan">{cd.quantity}</span>
                                <button className="addToCart-item-abtn" onClick={() => cartDispatch(cd.data, cd.quantity + 1)}>+</button>
                            </div>
                            <div className="addToCart-item-delete">
                                <button onClick={() => deleteDispatch(cd.data)}>Delete</button>
                            </div>
                            </div>
                        </div>
                    })
                }
                <div className="addToCart-total">
                    <div><span className="addToCart-item-title">Grand Total : </span>&nbsp; <span className="addToCart-total-amount">$ {totalAmount(cartData) + 30}</span></div>
                </div>
            </div>
        )
}

const totalAmount = dataLocal => {
    let total = dataLocal.reduce((ac,cd) => ac + (cd.data.price * cd.quantity),0);
    return total;
}

const mapStateToProps = state => {
    return {
        cartData: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch : (data, quan) => dispatch(addItems(data, quan)),
        deleteDispatch : data => dispatch(deleteItem(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)