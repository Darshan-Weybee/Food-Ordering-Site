import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { fetchProductData } from "../../redux/reducer/productListing/fetchProductData";
import Loader from "../../Component/Loader/Loader"
import { addItems } from "../../redux/reducer/addToCart/AddToCartReducer";
import { addFavItems } from "../../redux/reducer/favourite/FavouriteReducer";
import Popup from "../../Component/PopUp/Popup";
import FavPopup from "../../Component/FavPopUp/FavPopup"
import { useMemo } from "react";


function Product({dataState, productDispatch, favouriteDispatch, cartDispatch}){
    const [searchValue, setSearchValue] = useSearchParams("");
    const params = useParams();
    const [searchData, setSearchData] = useState([]);
    const [page, setPage] = useState({});
    const [search, setSearch] = useSearchParams(1);
    const curPage = search.get("_page") ? search.get("_page") : 1;
    const limit = search.get("_limit") ? search.get("_limit") : 16;
    const inputRef = useRef("");
    const [sortValue, setSortValue] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [favIsVisible, setFavIsVisible] = useState(false);

    const totalPage = useMemo(() =>  Math.ceil(page[params.type]/16), [page, params.type]);

    useEffect(() => {
        productDispatch(params.type, limit, curPage);
    },[productDispatch, params.type, limit, curPage]);

    useEffect(() => {
        fetch("https://ig-food-menus.herokuapp.com/pagination")
        .then(response => response.json())
        .then(res => setPage(res))
        .catch(err => console.error(err.message))
    },[params.type])

    let sValue = searchValue.get("name_like");
    let sLimit = searchValue.get("_limit")
    useEffect(() => {
        if(sValue === "") return setSearchData([]);
        fetch(`https://ig-food-menus.herokuapp.com/our-foods?_limit=${sLimit}&name_like=${sValue}`)
        .then(response => response.json())
        .then(res => setSearchData(res))
    },[sLimit,sValue]);


    return(
        <div className="product-parent flexColumn">
            <div className="product-upper flexRow">
            <div className="search flexRow">
                <input type="text" ref={inputRef} placeholder="Search your product" onKeyDown={e => {if(e.key === "Enter") setSearchValue({_limit : 16, name_like : e.target.value})}}/>
                <button onClick={() => setSearchValue({_limit : 16, name_like : inputRef.current.value})}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="f-dropdown">
                <button className="f-dropbtn"><i class="fa-solid fa-filter"></i>Filter</button>
                <div className="f-dropdown-content" onClick={e => setSortValue(e.target.textContent)}>
                    <div to="burgers">Under $100</div>
                    <div to="breads">$50 to $100</div>
                    <div to="sandwiches">Under $50</div>
                    <div to="pizzas">Above $100</div>
                </div>
            </div>
            </div>
        <div className="product flexRow">
            {dataState.loading ? <Loader/> :
            dataRender(searchData, dataState.data, sortValue).map((data,index) => {
                return  <Link to={data.id} key = {index} className="product-item">
                    <div className="product-hover-item">
                        <div className="product-hover-item-fav product-hover-effect-btn" onClick={e => onClickFav(setFavIsVisible, favouriteDispatch, e, data)}><i class="fa-regular fa-heart"></i></div>
                        <div className="product-hover-item-cart product-hover-effect-btn" onClick={e => onClickCart(setIsVisible, cartDispatch, e, data)}><i class="fa-solid fa-cart-shopping"></i></div>
                    </div>
                    <div className="product-item-img">
                        <img src={data.img} alt="food" onError={event => {
                            event.target.src = 'https://bookmychefs.com/uploads/dish/default_food.jpg'
                            event.onerror = null
                        }}/>
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
            })}
            <div className="pagination">
                <button className="pagination-btn" onClick={() => setSearch({_limit : 16 , _page : +curPage - 1})} disabled={+curPage === 1}><i class="fa-solid fa-chevron-left"></i></button>

                {pageButton(totalPage, curPage, setSearch)}
                
                <button className="pagination-btn" onClick={() => setSearch({_limit : 16 , _page : +curPage + 1})} disabled={+curPage === totalPage}><i class="fa-solid fa-chevron-right"></i></button>
            </div>
            {isVisible ? <Popup/> : ""}
            {favIsVisible ? <FavPopup/> : ""}
        </div>
        </div>
    )
}

const onClickFav = (setFavIsVisible, favouriteDispatch, e, data) => {
    if (e.target.className === "fa-heart") {
        setFavIsVisible(true);
    }
    setTimeout(() => {
        setFavIsVisible(false);
    }, 1000)
    favouriteDispatch(data)
}


const onClickCart = (setIsVisible, cartDispatch, e, data) => {
    if (e.target.className === "fa-cart-shopping") {
        setIsVisible(true);
    }
    setTimeout(() => {
        setIsVisible(false);
    }, 1000)
    cartDispatch(data, 1)
}

const pageButton = (totalPage, currentPage, setSearch) =>{
    let btn = [];
    let pageLimit = 4;
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

    for(let i=0; i<pageLimit; i++){
        let num = start + i + 1;

        if(num > totalPage) break;

        btn.push(<button key={num} className={`pagination-btn ${+currentPage === +num ? "active": ""}`} onClick={() => setSearch({_limit : 16, _page : num})}>{num}</button>);
    }
    return btn;
}

const dataRender = (searchData, actualData, sortValue) => {
    let temp = +searchData.length === 0 ? actualData : searchData;

    if(sortValue === "Under $100"){
        return temp.filter(el => el.price <= 100)
    }
    else if(sortValue === "$50 to $100"){
        return temp.filter(el => el.price >= 50 && el.price <= 100)
    }
    else if(sortValue === "Under $50"){
        return temp.filter(el => el.price < 50)
    }
    else if(sortValue === "Above $100"){
        return temp.filter(el => el.price > 100)
    }
    else if(sortValue === null){
        return temp
    }
}

const mapStateToProps = state => {
    return {
        dataState : state.productList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        productDispatch : (type, limit, currentPage) => dispatch(fetchProductData(type, limit, currentPage)),
        cartDispatch : (data, quantity) => dispatch(addItems(data, quantity)),
        favouriteDispatch : data => dispatch(addFavItems(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Product)

// onKeyDown={e => {if(e.key === "Enter") setSearchValue({_limit : 16, name_like : e.target.value})}}
// onInput={e => setSearchValue({_limit : 16, name_like : e.target.value})}