import React from "react";

function Pagination({page}){

    let totalPage = Math.ceil(page/16);
    let curPage = elements.page;

    return(
        <div>
            <button className="pagination-btn" onClick={() => {dataFetch({data : `${elements.type === "characters" ? "people" : elements.type}`, img : `${elements.type}`, page : `${+elements.page-1}`})}} disabled={+elements.page === 1}><i class="fa-solid fa-chevron-left"></i></button>
            
            {pageButton(elements, dataFetch, totalPage, curPage)}
            
            <button className="pagination-btn" onClick={() => {dataFetch({data : `${elements.type === "characters" ? "people" : elements.type}`, img : `${elements.type}`, page : `${+elements.page+1}`})}} disabled={+elements.page === totalPage}><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    )
}