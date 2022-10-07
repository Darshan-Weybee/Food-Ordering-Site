import React, { useEffect } from "react";
import Header from "../../Component/Header/Header";
import FeedBack from "../../Component/feedback/FeedBack";
import Menu from "../../Component/Menu/Menu";
import Loader from "../../Component/Loader/Loader"
import { useNavigate, Link } from "react-router-dom";
import Recent from "../../Component/Recent/Recent";
import { connect } from "react-redux";
import { fetchTotalNoOfItems } from "../../redux/reducer/totalItems/fetchTotalItems";
import Image from "../../Component/Image/Image";
import OnHoverFavouriteIcon from "../../Component/OnHoverFavouriteIcon/OnHoverFavouriteIcon";
import { fetchBestFoodData } from "../../redux/reducer/bestFoodData/fetchBestFoodData";
import OnHoverCartIcon from "../../Component/OnHoverCartIcon/OnHoverCartIcon";

function Home({ bestFood, totalItems, bestFoodDataDispatch, totalItemsDispatch }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(+bestFood.data.length !== 0) return;
        bestFoodDataDispatch();
    }, [bestFoodDataDispatch, bestFood.data.length]);

    useEffect(() => {
        if(totalItems.data) return;
        totalItemsDispatch();
    },[totalItemsDispatch,totalItems.data])

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
                        {bestFood.loading && <Loader />}
                        {bestFood.data && <RenderBestFoodData bestFoodData={bestFood.data}/>}
                    </div>
                </div>
            </div>
            <Recent />
            <FeedBack />
        </div>
    )
}

const RenderBestFoodData = ({bestFoodData}) => {
    return bestFoodData.map((item, index) => {
        return <Link key={index} to={`best-foods/${item.id}`} className="home-bestFood-item">
           <OnHoverFavouriteIcon data={item}/>
           <OnHoverCartIcon data={item} quantity={1}/>
            <div className="home-bestFood-item-img">
                <Image path={item.img}/>
            </div>
            <div className="home-bestFood-item-desc">
                <div className="home-bestFood-item-desc-dsc">{item.dsc}</div>
                <div className="home-bestFood-item-desc-name">{item.name}</div>
                <div className="home-bestFood-item-desc-price">${item.price}</div>
            </div>
            <div className="home-bestFood-item-rate">{item.rate} <i class="fa-sharp fa-solid fa-star"></i></div>
        </Link>

    })
}

const mapStateToProps = state => {
    return {
        bestFood : state.bestFood,
        totalItems : state.totalItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        totalItemsDispatch : () => dispatch(fetchTotalNoOfItems()),
        bestFoodDataDispatch : () => dispatch(fetchBestFoodData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)