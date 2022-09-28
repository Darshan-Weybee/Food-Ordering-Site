import React from "react";

function Header(){
    return(
        <div className="header">
            <div className="header-middle flexRow">
                <div className="header-middle-left flexColumn">
                    <div className="header-middle-left-text flexColumn">
                        <span>it's not just</span>
                        <span>Food, it's an</span>
                        <span>Experience.</span>
                    </div>
                    <div className="header-middle-left-btn">
                        <button className="header-middle-left-menuBtn header-btn">View Menu</button>
                        <button className="header-middle-left-tableBtn header-btn">Book A Table</button>
                    </div>
                </div>
                <div className="header-middle-right">
                    <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg" alt="headerImage"/>
                </div>
                <div className="header-side-img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdt2fPFJh6-z7BqNx6htg2XoAXg4ssDbd31EOL7ay66NZu7aNmZoNYKGg2dYi61WTipS8&usqp=CAU" alt="food"/>
                </div>
            </div>
        </div>
    )
}

export default Header