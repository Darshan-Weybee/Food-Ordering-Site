import React, { useState } from "react";
import { connect } from "react-redux";
import { addItems } from "../../redux/reducer/addToCart/AddToCartReducer";
import { addFavItems } from "../../redux/reducer/favourite/FavouriteReducer";
import Popup from "../PopUp/Popup";
import FavPopup from "../FavPopUp/FavPopup"
import { Link } from "react-router-dom";

function Recent({ recentData, favDispatch, cartDispatch }) {
    const [isVisible, setIsVisible] = useState(false);
    const [favIsVisible, setFavIsVisible] = useState(false);
    return (
        <>
            {+recentData.length === 0 ? "" :
                <div className="recent">
                    <div className="recent-title">
                        <div className="recent-title-name"> Your Recent </div>
                    </div>
                    <div className="recent-content flexRow">
                        {renderRecentData(recentData).map((item, index) => {
                            return <Link to={`/${item.typeOfItem}/${item.data.id}`} key={index} className="recent-item">
                                    <div className="recent-item-img"><img src={item.data.img} alt="item" /></div>
                                    <div className="recent-item-name">{item.data.name}</div>
                                    <div className="recent-hover-item">
                                        <div className="recent-hover-item-fav recent-hover-effect-btn" onClick={e => onClickFav(setFavIsVisible, favDispatch, e, item)}><i class="fa-regular fa-heart"></i></div>
                                        <div className="recent-hover-item-cart recent-hover-effect-btn" onClick={e => onClickCart(setIsVisible, cartDispatch, e, item)}><i class="fa-solid fa-cart-shopping"></i></div>
                                    </div>
                                </Link>
                        })}
                    </div>
                    {isVisible ? <Popup/> : ""}
                    {favIsVisible ? <FavPopup/> : ""}
                </div>}
        </>
    )
}

const onClickFav = (setFavIsVisible, favDispatch, e, item) => {
    if (e.target.className === "fa-heart") {
        setFavIsVisible(true);
    }
    setTimeout(() => {
        setFavIsVisible(false);
    }, 1000)
    favDispatch(item.data)
}


const onClickCart = (setIsVisible, cartDispatch, e, item) => {
    if (e.target.className === "fa-cart-shopping") {
        setIsVisible(true);
    }
    setTimeout(() => {
        setIsVisible(false);
    }, 1000)
    cartDispatch(item.data, 1)
}



// to={`${item.type}/${item.data.id}`}

const renderRecentData = (recentData) => {
    return recentData.sort((a, b) => (a.num > b.num) ? -1 : 1).slice(0, 5);
}

const mapStateToProps = state => {
    return {
        recentData: state.recent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch: (data, quan) => dispatch(addItems(data, quan)),
        favDispatch: data => dispatch(addFavItems(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recent)