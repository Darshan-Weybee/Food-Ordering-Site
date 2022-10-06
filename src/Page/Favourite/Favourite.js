import React from "react";
import { connect } from "react-redux";
import { deleteFavItem } from "../../redux/reducer/favourite/FavouriteReducer";

function Favourite({ favouriteData, deleteFavDispatch }) {

    return (
        <div className="fav">
            {favouriteData.length === 0 && <EmptyList/>}
            {favouriteData.length !== 0 && <FavouriteItemInfo favouriteData={favouriteData} deleteFavDispatch={deleteFavDispatch}/>}
        </div>
    )
}

const EmptyList = () => {
    return <div className="empty-cart">
        <div className="empty-cart-img"><img src="https://food-g-app.web.app/static/media/empty-cart.f9db2821.svg" alt="cart-empty" /></div>
        <h2 className="empty-cart-text">Your wishlist is empty 🍔</h2>
    </div>
}

const FavouriteItemInfo = ({favouriteData, deleteFavDispatch}) => {
    return favouriteData.map((unit, index) => {
        return <div key={index} className="fav-item flexRow">
            <div className="fav-item-img">
                <img src={unit.data.img} alt="cartFood" onError={imgNotFound} />
            </div>
            <div className="fav-item-content">
                <div className="fav-item-name">{unit.data.name}</div>
                <div className="fav-item-dsc">{unit.data.dsc}</div>
                <div className="fav-item-price"> $ {unit.data.price}</div>
                <div className="fav-item-rate">{unit.data.rate}  <i className="fa-sharp fa-solid fa-star"></i></div>
                <div className="fav-item-delete">
                    <button onClick={() => deleteFavDispatch(unit.data)}>Delete</button>
                </div>
            </div>
        </div>
    })
}

const imgNotFound = event => {
    event.target.src = 'https://bookmychefs.com/uploads/dish/default_food.jpg'
    event.onerror = null
}

const mapStateToProps = state => {
    return {
        favouriteData: state.favourite
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteFavDispatch: data => dispatch(deleteFavItem(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourite)