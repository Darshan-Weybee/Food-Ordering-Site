import React from "react";
import { Link } from "react-router-dom";

const menu = [
    {
        name : "Burgers",
        type : "burgers",
        img : "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
    },
    {
        name : "Breads",
        type : "breads",
        img : "https://rakskitchen.net/wp-content/uploads/2016/01/garlic-bread-with-cheese.jpg"
    },
    {
        name : "Sandwitch",
        type : "sandwiches",
        img : "https://c.ndtvimg.com/2021-07/vckh316o_grilled-chicken-sandwich_625x300_28_July_21.jpg"
    },
    {
        name : "Pizza",
        type : "pizzas",
        img : "https://timesofindia.indiatimes.com/thumb/msid-87930581,width-1200,height-900,resizemode-4/.jpg"
    },
    {
        name : "Drinks",
        type : "drinks",
        img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyla30OIyPjJ61mmKw5IbSlkUVG1qckx_7RrjXbGsjLcAM8y2x3vzrZu3WhzjchBrG0FI&usqp=CAU"
    }
]

function Menu(){
    return(
        <div className="menu">
            <div className="menu-title">
                <div className="menu-title-name"> Our Menu </div>
                <div className="menu-title-img"><img src="https://mamaearthp.imgix.net/wysiwyg/strip2x.png?auto=format" alt="underline"/></div>
            </div>
            <div className="menu-content flexRow">
                {
                    menu.map((item, index) => {
                        return <Link to={item.type} key={index} className="menu-item">
                            <div className="menu-item-img"><img src={item.img} alt="item"/></div>
                            <div className="menu-item-name">{item.name}</div>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default Menu