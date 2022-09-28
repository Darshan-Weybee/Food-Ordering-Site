import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Search(){
    const [searchValue, setSearchValue] = useSearchParams("");
    const [data, setData] = useState([]);

    let sValue = searchValue.get("q");
    useEffect(() => {
        fetch(`https://ig-food-menus.herokuapp.com?q=${sValue}`)
        .then(response => response.json())
        .then()
    });

    return(
        <div className="search">
            <input type="text" onKeyDown={e => {if(e.key === "Enter") setSearchValue({q : e.target.value})}}/>
            <button >Search</button>
        </div>
    )
}

export default Search