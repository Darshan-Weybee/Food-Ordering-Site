import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OnHoverFavouriteIcon from "../OnHoverFavouriteIcon/OnHoverFavouriteIcon";
import OnHoverCartIcon from "../OnHoverCartIcon/OnHoverCartIcon";
import Image from "../Image/Image"

function Recent({recentData}) {

    const RenderRecentData = () => {
        return <div className="recent">
        <div className="recent-title">
            <div className="recent-title-name"> Your Recent </div>
        </div>
        <div className="recent-content flexRow">
            {topRecentData(recentData).map((item, index) => {
                return <Link to={`/${item.typeOfItem}/${item.data.id}`} key={index} className="recent-item">
                        <div className="recent-item-img">
                            <Image path={item.data.img}/>
                        </div>
                        <div className="recent-item-name">{item.data.name}</div>
                        <div className="recent-hover-item">
                            <div className="recent-hover-item-fav recent-hover-effect-btn"><OnHoverFavouriteIcon data={item.data}/></div>
                            <div className="recent-hover-item-cart recent-hover-effect-btn"><OnHoverCartIcon data={item.data} quantity={1}/></div>
                        </div>
                    </Link>
            })}
        </div>
    </div>
    }
    
    const topRecentData = () => {
        return recentData.sort((a, b) => (a.num > b.num) ? -1 : 1).slice(0, 5);
    }

    return (
        <>
            {+recentData.length === 0 && null}
            {+recentData.length !== 0 && <RenderRecentData/>}              
        </>
    )
}


const mapStateToProps = state => {
    return {
        recentData: state.recent
    }
}
export default connect(mapStateToProps)(Recent)