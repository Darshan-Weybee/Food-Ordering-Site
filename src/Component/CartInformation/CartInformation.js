import React from "react";
import { connect } from "react-redux";
import { addItems, deleteItem } from "../../redux/reducer/addToCart/AddToCartReducer";
import Image from "../Image/Image";

function CartInformation({cartData, cartDispatch, deleteDispatch}) {

    const quantityDecrease = (unit) => {
        cartDispatch(unit.data, unit.quantity === 1 ? 1 : unit.quantity - 1)
    }
    
    const quantityIncrease = (unit) => {
        cartDispatch(unit.data, unit.quantity + 1)
    }
    
    return cartData.map((unit, index) => {
        return <div key={index} className="addToCart-item flexRow">
            <div className="addToCart-item-img">
                <Image path={unit.data.img} />
            </div>
            <div className="addToCart-item-content">
                <div className="addToCart-item-name">{unit.data.name}</div>
                <div className="addToCart-item-dsc">{unit.data.dsc}</div>
                <div className="addToCart-item-price"> $ {unit.data.price}</div>
                <div className="addToCart-item-rate">{unit.data.rate}  <i className="fa-sharp fa-solid fa-star"></i></div>
                <div className="addToCart-item-buttons">
                    <button className="addToCart-item-nbtn" onClick={() => quantityDecrease(unit)}>-</button>
                    <span className="addToCart-item-quan">{unit.quantity}</span>
                    <button className="addToCart-item-abtn" onClick={() => quantityIncrease(unit)}>+</button>
                </div>
                <div className="addToCart-item-delete">
                    <button onClick={() => deleteDispatch(unit.data.id)}>Delete</button>
                </div>
            </div>
        </div>
    })
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

export default connect(mapStateToProps, mapDispatchToProps)(CartInformation)