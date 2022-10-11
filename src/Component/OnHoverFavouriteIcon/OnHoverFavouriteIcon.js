import React, { useState } from "react";
import { connect } from "react-redux";
import { addFavItems } from "../../redux/reducer/favourite/FavouriteReducer";
import { popupNotVisible, popupVisible } from "../../redux/reducer/popup/popupreducer";

function OnHoverFavouriteIcon({ favouriteDispatch, data , popupHideDispatch, popupVisibleDispatch}) {

    const onClickFav = e => {
        e.preventDefault();
        popupVisibleDispatch("The product has been added to your favourites","fav");
        setTimeout(() => {
            popupHideDispatch();
        }, 1000)
        favouriteDispatch(data)
    }

    return (
        <div className="on-hover-fav" onClick={onClickFav}>
            <i class="fa-regular fa-heart"></i>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        favouriteDispatch: data => dispatch(addFavItems(data)),
        popupVisibleDispatch : (msg, type) => dispatch(popupVisible(msg, type)),
        popupHideDispatch : () => dispatch(popupNotVisible())
    }
}

export default connect(null, mapDispatchToProps)(OnHoverFavouriteIcon)