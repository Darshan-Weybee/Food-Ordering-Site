import React, {  useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";


function Search() {
    const [search, setSearch] = useSearchParams(1);
    const inputRef = useRef("");

    const searchObj  = useMemo(()=>{
        const params = {};
        search.forEach((value,key)=>params[key]=value)
        return {...params} 
    },[search])
    

    return (
        <div className="product-upper flexRow">
            <SearchBar inputRef={inputRef} searchObj={searchObj} setSearch={setSearch}/>
            <Filter setSearch={setSearch} searchObj={searchObj}/>
        </div>
    )
}

const SearchBar = ({inputRef, searchObj, setSearch}) => {
    return <div className="search flexRow">
        <input type="text" ref={inputRef} placeholder="Search your product" onKeyDown={e => { if (e.key === "Enter") setSearch({ ...searchObj, _limit: 16, name_like: e.target.value }) }} />
        <button onClick={() => setSearch({ ...searchObj, _limit: 16, name_like: inputRef.current.value })}><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
}

const Filter = ({setSearch,searchObj}) => {
    return <div className="f-dropdown">
        <button className="f-dropbtn"><i class="fa-solid fa-filter"></i>Filter</button>
        <div className="f-dropdown-content">
            <div to="burgers" onClick={() => setSearch({ ...removeProperty(searchObj), _page : 1, price_lte: 100 })}>Under $100</div>
            <div to="breads" onClick={() => setSearch({ ...removeProperty(searchObj), _page : 1, price_gte: 50, price_lte: 100 })}>$50 to $100</div>
            <div to="sandwiches" onClick={() => setSearch({ ...removeProperty(searchObj), _page : 1, price_lte: 50 })}>Under $50</div>
            <div to="pizzas" onClick={() => setSearch({ ...removeProperty(searchObj), _page : 1, price_gte: 100 })}>Above $100</div>
        </div>
    </div>
}

const removeProperty = searchObj => {
    delete searchObj["price_lte"];
    delete searchObj["price_gte"];
    return searchObj;
}

export default Search