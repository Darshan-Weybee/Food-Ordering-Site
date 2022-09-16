import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="navbar flexRow">
            <div className="navbar-title">F<span>oo</span>dy</div>
            <div className="navbar-link flexRow">
                <Link to={"/"}>Home</Link>
                <div>Menu</div>
                <div>About us</div>
                <div>Contact us</div>
            </div>
            <div className="navbar-right flexRow">
                <div>Login</div>
                <div>Sign Up</div>
            </div>
        </div>
    )
}

export default Navbar