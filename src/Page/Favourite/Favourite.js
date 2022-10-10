import React from "react";
import { connect } from "react-redux";
import FavouriteInformation from "../../Component/FavouriteInformation/FavouriteInformation";
import Image from "../../Component/Image/Image";

function Favourite({ favouriteData }) {

    return (
        <div className="fav">
            {favouriteData.length === 0 && <EmptyList/>}
            {favouriteData.length !== 0 && <FavouriteInformation/>}
        </div>
    )
}

const EmptyList = () => {
    return <div className="empty-cart">
        <div className="empty-cart-img">
            <Image path="https://food-g-app.web.app/static/media/empty-cart.f9db2821.svg"/>
        </div>
        <h2 className="empty-cart-text">Your wishlist is empty 🍔</h2>
    </div>
}

const mapStateToProps = state => {
    return {
        favouriteData: state.favourite
    }
}

export default connect(mapStateToProps)(Favourite)