import React from "react";

function Image({path}){
    return <img src={path} alt="foodItem" onError={imgNotFound}/>
}

const imgNotFound = event => {
    event.target.src = 'https://bookmychefs.com/uploads/dish/default_food.jpg'
    event.onerror = null
}

export default Image