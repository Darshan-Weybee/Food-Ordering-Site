import React from "react";
import Image from "../Image/Image";
import Draggable from "react-draggable";

function Header(){
    return(
        <div className="header">
            <Draggable
          defaultPosition={{ x: 0, y: 0 }}
        >
           <div><img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="book" width="20px" height="50px" style={{ margin:"20px"}} draggable={false}/></div>
        </Draggable>
           
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
                    <Image path="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg"/>
                </div>
                <div className="header-side-img">
                    <Image path="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdt2fPFJh6-z7BqNx6htg2XoAXg4ssDbd31EOL7ay66NZu7aNmZoNYKGg2dYi61WTipS8&usqp=CAU"/>
                </div>
            </div>
        </div>
    )
}

export default Header