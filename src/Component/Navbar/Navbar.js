import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="navbar flexRow">
            <div className="navbar-title">F<span>oo</span>dy</div>
            <div className="navbar-link flexRow">
                <Link to="/">Home</Link>
                <div className="navbar-link-menu">Menu</div>
                <div className="navbar-dropdown hidden">
                    <Link to="burgers">Burger</Link>
                    <Link to="breads">Bread</Link>
                    <Link to="sandwiches">Sandwitch</Link>
                    <Link to="pizzas">Pizza</Link>
                    <Link to="drinks">Drinks</Link>
                </div>
                <Link to="/about">About us</Link>
                <Link to="/contact">Contact us</Link>
                <Link to="/addtocart">Cart</Link>
            </div>
            <div className="navbar-right flexRow">
                <div>Login</div>
                <div>Sign Up</div>
            </div>
        </div>
    )
}

export default Navbar