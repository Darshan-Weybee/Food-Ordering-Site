import React from "react";

function Popup({message, type}){
    return (
        <div className={`popup-${type} popup flexRow`}>
            <div className={`popup-${type}-s-icon popup-s-icon`}><i class="fa-solid fa-check"></i></div>
            <div className="popup-message">
                <div className="popup-success-msg">Success!</div>
                <div className="popup-text">{message}</div>
            </div>
        </div>
    )
}

export default Popup