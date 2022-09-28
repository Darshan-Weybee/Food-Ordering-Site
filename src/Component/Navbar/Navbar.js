import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Navbar({ cartData }) {
    return (
        <div className="navbar flexRow">
            <div className="navbar-left flexRow">
                <Link to="/" className="navbar-title">F<span>oo</span>dy</Link>
                <div className="navbar-link flexRow">
                    <div><Link to="/">Home</Link></div>
                    <div className="dropdown">
                        <button className="dropbtn">Menu</button>
                        <div className="dropdown-content">
                            <Link to="burgers">Burger</Link>
                            <Link to="breads">Bread</Link>
                            <Link to="sandwiches">Sandwitch</Link>
                            <Link to="pizzas">Pizza</Link>
                            <Link to="drinks">Drinks</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flexRow">
            <div className="navbar-fav">
                <Link to="/favourite"><i class="fa-solid fa-bookmark"></i></Link>
            </div>
            <div className="navbar-cart">
                <Link to="/addtocart"><i class="fa-solid fa-cart-shopping"></i></Link>
                <div className="navbar-cart-item">{cartData.length}</div>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartData: state.cart
    }
}

export default connect(mapStateToProps)(Navbar)