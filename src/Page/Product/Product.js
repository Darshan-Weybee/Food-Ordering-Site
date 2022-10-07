import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { fetchProductData } from "../../redux/reducer/productListing/fetchProductData";
import Loader from "../../Component/Loader/Loader"
import { useMemo } from "react";
import Search from "../../Component/Search/Search";
import OnHoverFavouriteIcon from "../../Component/OnHoverFavouriteIcon/OnHoverFavouriteIcon";
import OnHoverCartIcon from "../../Component/OnHoverCartIcon/OnHoverCartIcon";
import Image from "../../Component/Image/Image";


function Product({ dataState, totalItems, productDispatch, favouriteDispatch, cartDispatch }) {
    const params = useParams();
    const [search, setSearch] = useSearchParams(1);

    // const [searchData, setSearchData] = useState([]);
    // const inputRef = useRef("");
    // const [sortValue, setSortValue] = useState(null);

    const currentPage = useMemo(() => search.get("_page") ? search.get("_page") : 1, [search]);
    const pageLimit = useMemo(() => search.get("_limit") ? search.get("_limit") : 16, [search]);
    const totalPage = useMemo(() => Math.ceil(totalItems[params.type] / 16), [totalItems, params.type]);

    useEffect(() => {
        productDispatch(params.type, pageLimit, currentPage);
    }, [productDispatch, params.type, pageLimit, currentPage]);

    // let sValue = search.get("name_like");
    // let sLimit = search.get("_limit")
    // useEffect(() => {
    //     if(sValue === "") return setSearchData([]);
    //     fetch(`https://ig-food-menus.herokuapp.com/our-foods?_limit=${sLimit}&name_like=${sValue}`)
    //     .then(response => response.json())
    //     .then(res => setSearchData(res))
    // },[sLimit,sValue]);

    return (
        <div className="product-parent flexColumn">
            <Search />
            <div className="product flexRow">
                {dataState.loading && <Loader />}
                {dataState.error && dataState.error}
                {dataState.data && <RenderProductData dataState={dataState} />}

                <div className="pagination">
                    <PageButton totalPage={totalPage} currentPage={currentPage} setSearch={setSearch} />
                </div>
            </div>
        </div>
    )
}

const RenderProductData = ({ dataState }) => {
    return dataState.data.map((data, index) => {
        return <Link to={data.id} key={index} className="product-item">
            <div className="product-hover-item">
                <OnHoverFavouriteIcon data={data} />
                <OnHoverCartIcon data={data} quantity={1} />
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

const PageButton = ({ totalPage, currentPage, setSearch }) => {
    let btn = [];
    let pageLimit = 4;
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

    btn.push(<button className="pagination-btn" onClick={() => setSearch({ _limit: 16, _page: +currentPage - 1 })} disabled={+currentPage === 1}><i class="fa-solid fa-chevron-left"></i></button>)

    for (let i = 0; i < pageLimit; i++) {
        let num = start + i + 1;

        if (num > totalPage) break;

        btn.push(<button key={num} className={`pagination-btn ${+currentPage === +num ? "active" : ""}`} onClick={() => setSearch({ _limit: 16, _page: num })}>{num}</button>);
    }

    btn.push(<button className="pagination-btn" onClick={() => setSearch({ _limit: 16, _page: +currentPage + 1 })} disabled={+currentPage === totalPage}><i class="fa-solid fa-chevron-right"></i></button>);

    return btn;
}

const mapStateToProps = state => {
    return {
        dataState: state.productList,
        totalItems: state.totalItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        productDispatch: (type, pageLimit, currentPage) => dispatch(fetchProductData(type, pageLimit, currentPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)