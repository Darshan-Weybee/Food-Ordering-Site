import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import FeedBack from "../feedback/FeedBack";
import Menu from "../Menu/Menu";
import Loader from "../Loader/Loader"
import { useNavigate, Outlet, useParams, Link } from "react-router-dom";
import Recent from "../Recent/Recent";

function Home(){
    const params = useParams();
    const navigate = useNavigate();

    const [bestFood, setBestFood] = useState([]);
    useEffect(() => {
        axios.get("https://ig-food-menus.herokuapp.com/best-foods?_limit=8")
        .then(res => setBestFood(res.data));
    },[]);

    return (
        params.type ? <Outlet/> :
        <div>
            <Header/>
            <Menu/>
            <div className="home flexColumn">
                <div className="home-bestFood">
                    <div className="home-bestFood-title flexRow">
                        <div className="home-bestFood-title-name">Recommended for You</div>
                        <div className="home-bestFood-title-btn"><button className="home-bestFood-title-VBtn" onClick={() => navigate("best-foods")}>View All <i class="fa-solid fa-arrow-right"></i> </button></div>
                    </div>
                    <div className="home-bestFood-content flexRow">
                            {+bestFood.length === 0 ? <Loader/> : bestFood.map((ele,index) => food(ele,index))}
                    </div>
                </div>
            </div>
            <Recent/>
            <FeedBack/>
        </div>
    )
}

const food = (ele, index) => {
        return (
            <Link key={index} to={`best-foods/${ele.id}`} className="home-bestFood-item">
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



export default Home