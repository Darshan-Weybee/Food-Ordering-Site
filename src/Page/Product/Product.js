import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { fetchProductData } from "../../redux/reducer/productListing/fetchProductData";
import Loader from "../../Component/Loader/Loader"
import { useMemo } from "react";
import Search from "../../Component/Search/Search";
import OnHoverFavouriteIcon from "../../Component/OnHoverFavouriteIcon/OnHoverFavouriteIcon";
import OnHoverCartIcon from "../../Component/OnHoverCartIcon/OnHoverCartIcon";
import Image from "../../Component/Image/Image";
import { fetchDataForCount } from "../../redux/reducer/dataCounter/fetchDataForCount";


function Product({ dataState, productDispatch, dataCountDispatch, totalData }) {
    const params = useParams();
    const [search, setSearch] = useSearchParams(1);

    const currentPage = useMemo(() => search.get("_page") ? search.get("_page") : 1, [search]);
    const totalPage = useMemo(() => Math.ceil(totalData.totalItems.length / 16), [totalData.totalItems.length]);

    const searchObj  = useMemo(()=>{
        const params = {};
        search.forEach((value,key) => {
            params[key]=value;
        })
        return {...params};
    },[search])

    useEffect(() => {
        console.log(searchObj);
        productDispatch(params.type, searchObj);
    }, [productDispatch, params.type, searchObj]);
    
    useEffect(() => {
        dataCountDispatch(params.type, searchObj)
    },[dataCountDispatch, params.type, searchObj])
    

    const RenderProductData = () => {
        return dataState.listingInfo.map((data, index) => {
            return <Link to={data.id} key={index} className="product-item">
                <div className="product-hover-item">
                    <div className="product-hover-item-fav product-hover-effect-btn"><OnHoverFavouriteIcon data={data}/></div>
                    <div className="product-hover-item-cart product-hover-effect-btn"><OnHoverCartIcon data={data} quantity={1} /></div>
                </div>
                <div className="product-item-img">
                    <Image path={data.img}/>
                </div>
                <div className="product-item-content">
                    <div className="product-item-name">{data.name}</div>
                    <div className="product-item-dsc">{data.dsc}</div>
                    <div className="product-item-cr">
                        <div className="product-item-location"><i class="fa-solid fa-location-dot"></i>  {data.country}</div>
                        <div className="product-item-price"> $ {data.price}</div>
                    </div>
                </div>
                <div className="product-item-rate">{data.rate}  <i className="fa-sharp fa-solid fa-star"></i></div>
            </Link>
        })
    }

    return (
        <div className="product-parent flexColumn">
            <Search />
            <div className="product flexRow">
                {dataState.loading && <Loader />}
                {dataState.error && dataState.error}
                {dataState.listingInfo && <RenderProductData/>}

                <div className="pagination">
                    <PageButton totalPage={totalPage} currentPage={currentPage} setSearch={setSearch} searchObj={searchObj}/>
                </div>
            </div>
        </div>
    )
}



const PageButton = ({ totalPage, currentPage, setSearch, searchObj }) => {
    let btn = [];
    let pageLimit = 4;
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

    btn.push(<button className="pagination-btn" onClick={() => setSearch({ ...searchObj, _limit: 16, _page: +currentPage - 1 })} disabled={+currentPage === 1}><i class="fa-solid fa-chevron-left"></i></button>)

    for (let i = 0; i < pageLimit; i++) {
        let num = start + i + 1;

        if (num > totalPage) break;

        btn.push(<button key={num} className={`pagination-btn ${+currentPage === +num ? "active" : ""}`} onClick={() => setSearch({ ...searchObj, _limit: 16, _page: num })}>{num}</button>);
    }

    btn.push(<button className="pagination-btn" onClick={() => setSearch({ ...searchObj, _limit: 16, _page: +currentPage + 1 })} disabled={+currentPage === totalPage}><i class="fa-solid fa-chevron-right"></i></button>);

    return btn;
}

const mapStateToProps = state => {
    return {
        dataState: state.productList,
        totalData : state.totalData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        productDispatch: (type, searchString) => dispatch(fetchProductData(type, searchString)),
        dataCountDispatch : (type, searchParam) => dispatch(fetchDataForCount(type, searchParam))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)