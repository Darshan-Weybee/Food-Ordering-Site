import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addItems } from "../AddToCart/AddToCartReducer";

function ProductDetails({cartDispatch}){
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(`https://ig-food-menus.herokuapp.com/${params.type}/${params.id}`)
        .then(response => response.json())
        .then(res => setData(res))
        .catch(error => console.error(error.message))
    },[])
    return (
        <div className="productDetails flexRow">
            <div className="productDetails-img">
                <img src={data.img} alt="foodItem"/>
            </div>
            <div className="productDetails-content">
                <div>{data.name}</div>
                <div>{data.rate}</div>
                <div>{data.dsc}</div>
                <div>
                    <button onClick={() => setQuantity(pst => pst === 1 ? 1 : pst - 1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(pst => pst + 1)}>+</button>
                </div>
                <div>
                    <button onClick={() => cartDispatch(data, quantity)}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch : (data, quan) => dispatch(addItems(data, quan))
    }
}

export default connect(null, mapDispatchToProps)(ProductDetails)