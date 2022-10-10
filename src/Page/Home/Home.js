import React, { useEffect } from "react";
import Header from "../../Component/Header/Header";
import FeedBack from "../../Component/feedback/FeedBack";
import Menu from "../../Component/Menu/Menu";
import Loader from "../../Component/Loader/Loader"
import { useNavigate, Link } from "react-router-dom";
import Recent from "../../Component/Recent/Recent";
import { connect } from "react-redux";
import Image from "../../Component/Image/Image";
import OnHoverFavouriteIcon from "../../Component/OnHoverFavouriteIcon/OnHoverFavouriteIcon";
import { fetchBestFoodData } from "../../redux/reducer/bestFoodData/fetchBestFoodData";
import OnHoverCartIcon from "../../Component/OnHoverCartIcon/OnHoverCartIcon";

function Home({ bestFood, bestFoodDataDispatch }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!bestFood.itemDetails.length) {
            bestFoodDataDispatch();
        }
    }, [bestFoodDataDispatch, bestFood.itemDetails.length]);

    const RenderBestFoodData = () => {

        if (bestFood.loading) {
            return <div className="home-bestFood-content flexRow">
                <Loader />
            </div>
        }
        return <div className="home-bestFood-content flexRow">
            {
                bestFood.itemDetails.map((item, index) => {
                    return <Link key={index} to={`best-foods/${item.id}`} className="home-bestFood-item">
                        <div className="home-hover-item">
                            <div className="home-hover-item-fav home-hover-effect-btn"><OnHoverFavouriteIcon data={item} /></div>
                            <div className="home-hover-item-cart home-hover-effect-btn"><OnHoverCartIcon data={item} quantity={1} /></div>
                        </div>
                        <div className="home-bestFood-item-img">
                            <Image path={item.img} />
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
        </div>
    }

    const RecommendedForYou = () => {
        return <div className="home-bestFood-title flexRow">
            <div className="home-bestFood-title-name">Recommended for You</div>
            <div className="home-bestFood-title-btn"><button className="home-bestFood-title-VBtn" onClick={() => navigate("best-foods")}>View All <i class="fa-solid fa-arrow-right"></i> </button></div>
        </div>
    }

    return (
        <div>
            <Header />
            <Menu />
            <div className="home flexColumn">
                <div className="home-bestFood">
                    <RecommendedForYou />
                    <RenderBestFoodData />
                </div>
            </div>
            <Recent />
            <FeedBack />
        </div>
    )
}


const mapStateToProps = state => {
    return {
        bestFood: state.bestFood
    }
}

const mapDispatchToProps = dispatch => {
    return {
        bestFoodDataDispatch: () => dispatch(fetchBestFoodData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)