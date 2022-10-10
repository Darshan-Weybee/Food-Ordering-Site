import React, { useState } from "react";
import { connect } from "react-redux";
import { addFavItems } from "../../redux/reducer/favourite/FavouriteReducer";
import FavPopup from "../FavPopUp/FavPopup"

function OnHoverFavouriteIcon({ favouriteDispatch, data }) {
    const [favIsVisible, setFavIsVisible] = useState(false);

    const onClickFav = e => {
        e.preventDefault();
        setFavIsVisible(true);
        setTimeout(() => {
            setFavIsVisible(false);
        }, 1000)
        favouriteDispatch(data)
    }

    return (
        <>
        <div className="on-hover-fav"onClick={onClickFav}>
            <i class="fa-regular fa-heart"></i>
        </div>
        {favIsVisible && <FavPopup/>}
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        favouriteDispatch: data => dispatch(addFavItems(data)),
    }
}

export default connect(null, mapDispatchToProps)(OnHoverFavouriteIcon)