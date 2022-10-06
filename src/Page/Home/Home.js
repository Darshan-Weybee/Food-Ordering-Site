import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import FeedBack from "../../Component/feedback/FeedBack";
import Menu from "../../Component/Menu/Menu";
import Loader from "../../Component/Loader/Loader"
import { useNavigate, Link } from "react-router-dom";
import Recent from "../../Component/Recent/Recent";
import { addItems } from "../../redux/reducer/addToCart/AddToCartReducer";
import { addFavItems } from "../../redux/reducer/favourite/FavouriteReducer";
import { connect } from "react-redux";

function Home({ favDispatch, cartDispatch }) {
    const navigate = useNavigate();
    const [setIsVisible] = useState(false);
    const [setFavIsVisible] = useState(false);

    const [bestFood, setBestFood] = useState([]);
    useEffect(() => {
        axios.get("https://ig-food-menus.herokuapp.com/best-foods?_limit=8")
            .then(res => setBestFood(res.data));
    }, []);

    return (
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
                        {+bestFood.length === 0 && <Loader />}
                        {+bestFood.length !== 0 && bestFood.map((item, index) => <Food item={item} index={index} setFavIsVisible={setFavIsVisible} favDispatch={favDispatch} setIsVisible={setIsVisible} cartDispatch={cartDispatch} />)}
                    </div>
                </div>
            </div>
            <Recent />
            <FeedBack />
        </div>
    )
}

const onClickFav = (setFavIsVisible, favDispatch, e, data) => {
    setFavIsVisible(true);
    setTimeout(() => {
        setFavIsVisible(false);
    }, 1000)
    favDispatch(data)
}


const onClickCart = (setIsVisible, cartDispatch, e, data) => {
    setIsVisible(true);
    setTimeout(() => {
        setIsVisible(false);
    }, 1000)
    cartDispatch(data, 1)
}

const DisplayHoverItem = ({ setFavIsVisible, favDispatch, setIsVisible, cartDispatch, item }) => {
    return <div className="home-hover-item">
        <div className="home-hover-item-fav home-hover-effect-btn" onClick={e => onClickFav(setFavIsVisible, favDispatch, e, item)}><i class="fa-regular fa-heart"></i></div>
        <div className="home-hover-item-cart home-hover-effect-btn" onClick={e => onClickCart(setIsVisible, cartDispatch, e, item)}><i class="fa-solid fa-cart-shopping"></i></div>
    </div>
}

const Food = ({ item, index, setFavIsVisible, favDispatch, setIsVisible, cartDispatch }) => {
    return (
        <Link key={index} to={`best-foods/${item.id}`} className="home-bestFood-item">
            <DisplayHoverItem setFavIsVisible={setFavIsVisible} favDispatch={favDispatch} setIsVisible={setIsVisible} cartDispatch={cartDispatch} item={item} />
            <div className="home-bestFood-item-img">
                <img src={item.img} alt={item.name} onError={imgNotFound} />
            </div>
            <div className="home-bestFood-item-desc">
                <div className="home-bestFood-item-desc-dsc">{item.dsc}</div>
                <div className="home-bestFood-item-desc-name">{item.name}</div>
                <div className="home-bestFood-item-desc-price">${item.price}</div>
            </div>
            <div className="home-bestFood-item-rate">{item.rate} <i class="fa-sharp fa-solid fa-star"></i></div>
        </Link>

    )
}

const imgNotFound = event => {
    event.target.src = 'https://bookmychefs.com/uploads/dish/default_food.jpg'
    event.onerror = null
}

const mapDispatchToProps = dispatch => {
    return {
        cartDispatch: (data, quantity) => dispatch(addItems(data, quantity)),
        favDispatch: data => dispatch(addFavItems(data)),
    }
}

export default connect(null, mapDispatchToProps)(Home)