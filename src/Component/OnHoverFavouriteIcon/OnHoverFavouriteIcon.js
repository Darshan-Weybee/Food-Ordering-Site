import React, { useState } from "react";
import { connect } from "react-redux";
import { addFavItems } from "../../redux/reducer/favourite/FavouriteReducer";
import FavPopup from "../FavPopUp/FavPopup"

function OnHoverFavouriteIcon({ favouriteDispatch, data }) {
    const [favIsVisible, setFavIsVisible] = useState(false);
    return (
        <>
        <div className="product-hover-item-fav product-hover-effect-btn" onClick={e => onClickFav(setFavIsVisible, favouriteDispatch, e, data)}>
            <i class="fa-regular fa-heart"></i>
        </div>
        {favIsVisible && <FavPopup/>}
        </>
    )
}

const onClickFav = (setFavIsVisible, favouriteDispatch, e, data) => {
    e.preventDefault();
    setFavIsVisible(true);
    setTimeout(() => {
        setFavIsVisible(false);
    }, 1000)
    favouriteDispatch(data)
}

const mapDispatchToProps = dispatch => {
    return {
        favouriteDispatch: data => dispatch(addFavItems(data)),
    }
}


export default connect(null, mapDispatchToProps)(OnHoverFavouriteIcon)