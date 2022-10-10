import React from "react";
import { connect } from "react-redux";
import { deleteFavItem } from "../../redux/reducer/favourite/FavouriteReducer";
import Image from "../Image/Image";

function FavouriteInformation({favouriteData, deleteFavDispatch}){
    return favouriteData.map((unit, index) => {
        return <div key={index} className="fav-item flexRow">
            <div className="fav-item-img">
                <Image path={unit.data.img}/>
            </div>
            <div className="fav-item-content">
                <div className="fav-item-name">{unit.data.name}</div>
                <div className="fav-item-dsc">{unit.data.dsc}</div>
                <div className="fav-item-price"> $ {unit.data.price}</div>
                <div className="fav-item-rate">{unit.data.rate}  <i className="fa-sharp fa-solid fa-star"></i></div>
                <div className="fav-item-delete">
                    <button onClick={() => deleteFavDispatch(unit.data.id)}>Delete</button>
                </div>
            </div>
        </div>
    })
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

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteInformation)