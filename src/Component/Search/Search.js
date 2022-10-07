import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
    const [search, setSearch] = useSearchParams(1);
    const inputRef = useRef("");
    const [sortValue, setSortValue] = useState(null);

    useEffect(() => {

    });

    return (
        <div className="product-upper flexRow">
            <div className="search flexRow">
                <input type="text" ref={inputRef} placeholder="Search your product" onKeyDown={e => { if (e.key === "Enter") setSearch({ _limit: 16, name_like: e.target.value }) }} />
                <button onClick={() => setSearch({ _limit: 16, name_like: inputRef.current.value })}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className="f-dropdown">
                <button className="f-dropbtn"><i class="fa-solid fa-filter"></i>Filter</button>
                <div className="f-dropdown-content" onClick={e => setSortValue(e.target.textContent)}>
                    <div to="burgers" onClick={() => setSearch({price_lte: 100})}>Under $100</div>
                    <div to="breads" onClick={() => setSearch({price_gte: 50, price_lte: 100})}>$50 to $100</div>
                    <div to="sandwiches">Under $50</div>
                    <div to="pizzas">Above $100</div>
                </div>
            </div>
        </div>
    )
}

export default Search