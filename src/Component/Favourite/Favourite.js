import React from "react";
import { connect } from "react-redux";
import { deleteFavItem } from "./FavouriteReducer";

function Favourite({ favData, deleteFavDispatch }) {

    return (
            <div className="fav">
                {
                    favData.length === 0 ?
                    <div className="empty-cart">
                        <div className="empty-cart-img"><img src="https://food-g-app.web.app/static/media/empty-cart.f9db2821.svg" alt="cart-empty"/></div>
                        <h2 className="empty-cart-text">Your wishlist is empty 🍔</h2>
                    </div> :
                    favData.map((cd, index) => {
                        return <div key={index} className="fav-item flexRow">
                            <div className="fav-item-img">
                                <img src={cd.data.img} alt="cartFood" onError={event => {
                                event.target.src = 'https://bookmychefs.com/uploads/dish/default_food.jpg'
                                event.onerror = null
                            }}/>
                            </div>
                            <div className="fav-item-content">
                                <div className="fav-item-name">{cd.data.name}</div>
                                <div className="fav-item-dsc">{cd.data.dsc}</div>
                                <div className="fav-item-price"> $ {cd.data.price}</div>
                                <div className="fav-item-rate">{cd.data.rate}  <i className="fa-sharp fa-solid fa-star"></i></div>
                            <div className="fav-item-delete">
                                <button onClick={() => deleteFavDispatch(cd.data)}>Delete</button>
                            </div>
                            </div>
                        </div>
                    })
                }
            </div>
        )
}

const mapStateToProps = state => {
    return {
        favData: state.fav
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteFavDispatch : data => dispatch(deleteFavItem(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourite)