import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";

function Home(){

    const [bestFood, setBestFood] = useState([]);
    useEffect(() => {
        axios.get("https://ig-food-menus.herokuapp.com/best-foods?_limit=6")
        .then(res => setBestFood(res.data));
    },[]);

    console.log(bestFood);


    return (
        <div>
            <Header/>
            <div className="home">
                <div className="home-bestFood flexRow">
                    <div className="home-bestFood-left">
                        <div className="home-bestFood-left-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                        <div className="home-bestFood-left-btn"><button>View All</button></div>
                    </div>
                    <div className="home-bestFood-right flexRow">{food(bestFood)}</div>
                </div>
            </div>
        </div>
    )
}

const food = data => {
    return data.map(ele => {
        return (
            <div className="home-bestFood-item">
                <div className="home-bestFood-item-img">
                    <img src={ele.img} alt={ele.name} />
                </div>
                <div className="home-bestFood-item-desc">
                    <div className="home-bestFood-item-desc-dsc">{ele.dsc}</div>
                    <div className="home-bestFood-item-desc-name">{ele.name}</div>
                    <div className="home-bestFood-item-desc-price">${ele.price}</div>
                </div>
                <div className="home-bestFood-item-rate">{ele.rate} <i class="fa-sharp fa-solid fa-star"></i></div>
            </div>

        )
    })
}



export default Home