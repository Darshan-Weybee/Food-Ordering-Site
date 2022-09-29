import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Recent({ recentData }) {

    return (
        <>
        { +recentData.length === 0 ? "" :
        <div className="recent">
            <div className="recent-title">
                <div className="recent-title-name"> Your Recent </div>
            </div>
            <div className="recent-content flexRow">
                {renderRecentData(recentData).map((item, index) => {
                    console.log(item);
                    return <div key={index} className="recent-item">
                        <div className="recent-item-img"><img src={item.data.img} alt="item" /></div>
                        <div className="recent-item-name">{item.data.name}</div>
                    </div>
                })}
            </div>
        </div>}
        </>
    )
}

// to={`${item.type}/${item.data.id}`}

const renderRecentData = (recentData) => {
    return recentData.sort((a, b) => (a.num > b.num) ? -1 : 1).slice(0, 5);
    
}

const mapStateToProps = state => {
    return {
        recentData: state.recent
    }
}

export default connect(mapStateToProps)(Recent)