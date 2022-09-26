import React from "react";
import { connect } from "react-redux";
import { addItems } from "./AddToCartReducer";

function AddToCart({ cartData, cartDispatch }) {
    console.log(cartData);
    return (
        <div className="addToCart">
            {
                cartData.map((cd, index) => {
                    return <div key={index} className="addToCart-item flexRow">
                        <div className="addToCart-item-img">
                            <img src={cd.data.img} alt="cartFood" />
                        </div>
                        <div className="addToCart-item-content">
                            <div>{cd.data.name}</div>
                            <div>{cd.data.rate}</div>
                            <div>{cd.data.dsc}</div>
                        </div>
                        <div>
                            <button onClick={() => cartDispatch(cd.data, cd.quantity - 1)}>-</button>
                            <span>{cd.quantity}</span>
                            <button onClick={inItem(cartData, cd.data.id)}>+</button>
                        </div>
                        <div>
                            <button></button>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

// const deItem = (cartData, id) => {
//     cartData.map( cd => {
//         if(cd.data.id === id){
//             return {
//                 ...cd,
//                 quantity : cd.quantity === 1 ? 1 : cd.quantity - 1
//             }
//         }
//     })
// }
const inItem = (cartData, id) => {
    cartData.map( cd => {
        if(cd.data.id === id){
            return {
                ...cd,
                quantity : cd.quantity + 1
            }
        }
    })
}

const mapStateToProps = state => {
    return {
        cartData: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch : (data, quan) => dispatch(addItems(data, quan))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)