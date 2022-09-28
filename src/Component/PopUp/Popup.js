import React, { useState } from "react";

function Popup(){

    return (
        <div className="popup flexRow">
            <div className="popup-s-icon"><i class="fa-solid fa-check"></i></div>
            <div className="popup-message">
                <div className="popup-success-msg">Success!</div>
                <div className="popup-text">The product has been added to cart</div>
            </div>
        </div>
    )
}

export default Popup