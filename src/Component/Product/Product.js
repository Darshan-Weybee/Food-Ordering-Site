import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { fetchData } from "../Reducer/FetchData";

function Product({dataState, dispatchURL}){
    const params = useParams();
    console.log(params);
    const [page, setPage] = useState({});

    useEffect(() => {
        dispatchURL(`https://ig-food-menus.herokuapp.com/${params.type}?_limit=16`)
    },[dispatchURL,params.type]);

    useEffect(() => {
        fetch("https://ig-food-menus.herokuapp.com/pagination")
        .then(response => response.json())
        .then(res => setPage(res))
        .catch(err => console.error(err.message))
    },[params.type])


    return(
        params.id ? <Outlet/> :
        <div className="product flexRow">
            {dataState.data.map((data,index) => {
                return  <Link to={data.id} key = {index} className="product-item" >
                    <div className="product-item-img">
                        <img src={data.img} alt="food"/>
                    </div>
                    <div className="product-item-content">
                        <div className="product-item-name">{data.name}</div>
                        <div className="product-item-dsc">{data.dsc}</div>
                        <div className="product-item-cr flexRow">
                            <div className="product-item-location">{data.country}</div>
                            <div className="product-item-price"> $ {data.price}</div>
                        </div>
                    </div>
                    <div className="product-item-rate">{data.rate}</div>
                </Link>
            })}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        dataState : state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchURL : url => dispatch(fetchData(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Product)