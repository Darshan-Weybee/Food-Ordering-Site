import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../Component/Loader/Loader";
import { addRecentItems } from "../../redux/reducer/recent/RecentReducer";
import { fetchProductDetails } from "../../redux/reducer/productDetails/fetchProductDetails";
import Image from "../../Component/Image/Image";
import OnHoverFavouriteIcon from "../../Component/OnHoverFavouriteIcon/OnHoverFavouriteIcon";
import OnHoverCartIcon from "../../Component/OnHoverCartIcon/OnHoverCartIcon";

function ProductDetails({ productInfo, recentDispatch, productDetailsDispatch }) {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        productDetailsDispatch(params.type, params.id);
    }, [params.id, params.type, productDetailsDispatch])

    useEffect(() => {
        recentDispatch(productInfo.data, params.type);
    }, [params.type, productInfo.data, recentDispatch])

    return (
        <div>
            {productInfo.loading && <Loader />}
            {productInfo.data && <RenderProductDetails productInfo={productInfo} quantity={quantity} setQuantity={setQuantity}/>}
        </div>
    )
}

const RenderProductDetails = ({productInfo, quantity, setQuantity}) => {
    return <div className="productDetails flexRow">
        <div className="productDetails-img">
            <Image path={productInfo.data.img} />
        </div>
        <div className="productDetails-content">
            <div className="productDetails-name">{productInfo.data.name}</div>
            <div className="productDetails-dsc">{productInfo.data.dsc}</div>
            <div className="productDetails-price"> $ {productInfo.data.price}</div>
            <div className="productDetails-rate">{productInfo.data.rate} <i className="fa-sharp fa-solid fa-star"></i></div>
            <div className="productDetails-buttons">
                <button className="productDetails-nbtn" onClick={() => decreaseQuantity(setQuantity)}>-</button>
                <span className="productDetails-quan">{quantity}</span>
                <button className="productDetails-abtn" onClick={() => increaseQuantity(setQuantity)}>+</button>
            </div>
            <div className="productDetails-cart">
                <button className="productDetails-cart-btn"><OnHoverCartIcon data={productInfo.data} quantity={quantity}/></button>
                <button className="productDetails-cart-fav"><OnHoverFavouriteIcon data={productInfo.data}/></button>
            </div>
        </div>
    </div>
}

const increaseQuantity = (setQuantity) => {
    setQuantity(pst => pst + 1)
}

const decreaseQuantity = (setQuantity) => {
    setQuantity(pst => pst === 1 ? 1 : pst - 1)
}

const mapStateToProps = state => {
    return {
        productInfo: state.productDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        productDetailsDispatch: (type, id) => dispatch(fetchProductDetails(type, id)),
        recentDispatch: (data, type) => dispatch(addRecentItems(data, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)