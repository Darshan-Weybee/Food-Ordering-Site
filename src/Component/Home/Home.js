import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import FeedBack from "../feedback/FeedBack";
import Menu from "../Menu/Menu";
import Loader from "../Loader/Loader"
import { useNavigate, Outlet, useParams, Link } from "react-router-dom";
import Recent from "../Recent/Recent";
import { addItems } from "../AddToCart/AddToCartReducer";
import { addFavItems } from "../Favourite/FavouriteReducer";
import { connect } from "react-redux";

function Home({favDispatch, cartDispatch}) {
    const params = useParams();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [favIsVisible, setFavIsVisible] = useState(false);

    const [bestFood, setBestFood] = useState([]);
    useEffect(() => {
        axios.get("https://ig-food-menus.herokuapp.com/best-foods?_limit=8")
            .then(res => setBestFood(res.data));
    }, []);

    return (
        params.type ? <Outlet /> :
            <div>
                <Header />
                <Menu />
                <div className="home flexColumn">
                    <div className="home-bestFood">
                        <div className="home-bestFood-title flexRow">
                            <div className="home-bestFood-title-name">Recommended for You</div>
                            <div className="home-bestFood-title-btn"><button className="home-bestFood-title-VBtn" onClick={() => navigate("best-foods")}>View All <i class="fa-solid fa-arrow-right"></i> </button></div>
                        </div>
                        <div className="home-bestFood-content flexRow">
                            {+bestFood.length === 0 ? <Loader /> : bestFood.map((ele, index) => food(ele, index, setFavIsVisible, favDispatch, setIsVisible, cartDispatch))}
                        </div>
                    </div>
                </div>
                <Recent />
                <FeedBack />
            </div>
    )
}

const onClickFav = (setFavIsVisible, favDispatch, e, data) => {
    if (e.target.className === "fa-heart") {
        setFavIsVisible(true);
    }
    setTimeout(() => {
        setFavIsVisible(false);
    }, 1000)
    favDispatch(data)
}


const onClickCart = (setIsVisible, cartDispatch, e, data) => {
    if (e.target.className === "fa-cart-shopping") {
        setIsVisible(true);
    }
    setTimeout(() => {
        setIsVisible(false);
    }, 1000)
    cartDispatch(data, 1)
}

const food = (ele, index, setFavIsVisible, favDispatch, setIsVisible, cartDispatch) => {
    return (
        <Link key={index} to={`best-foods/${ele.id}`} className="home-bestFood-item">
            <div className="home-hover-item">
                <div className="home-hover-item-fav home-hover-effect-btn" onClick={e => onClickFav(setFavIsVisible, favDispatch, e, ele)}><i class="fa-regular fa-heart"></i></div>
                <div className="home-hover-item-cart home-hover-effect-btn" onClick={e => onClickCart(setIsVisible, cartDispatch, e, ele)}><i class="fa-solid fa-cart-shopping"></i></div>
            </div>
            <div className="home-bestFood-item-img">
                <img src={ele.img} alt={ele.name} />
            </div>
            <div className="home-bestFood-item-desc">
                <div className="home-bestFood-item-desc-dsc">{ele.dsc}</div>
                <div className="home-bestFood-item-desc-name">{ele.name}</div>
                <div className="home-bestFood-item-desc-price">${ele.price}</div>
            </div>
            <div className="home-bestFood-item-rate">{ele.rate} <i class="fa-sharp fa-solid fa-star"></i></div>
        </Link>

    )
}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch: (data, quan) => dispatch(addItems(data, quan)),
        favDispatch: data => dispatch(addFavItems(data)),
    }
}

export default connect(null, mapDispatchToProps)(Home)