import React from "react";

function Popup(){

    return (
        <div className="popup-fav flexRow">
            <div className="popup-fav-s-icon">
                <i class="fa-solid fa-check"></i>
            </div>
            <div className="popup-fav-message">
                <div className="popup-fav-success-msg">Success!</div>
                <div className="popup-fav-text">The product has been added to your favourites</div>
            </div>
        </div>
    )
}

export default Popup