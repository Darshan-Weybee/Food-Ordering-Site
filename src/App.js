import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Home from './Page/Home/Home';
import Product from './Page/Product/Product';
import { connect } from 'react-redux';
import ProductDetails from './Page/ProductDetails/ProductDetails';
import AddToCart from './Page/AddToCart/AddToCart';
import Favourite from './Page/Favourite/Favourite';
import { useEffect } from 'react';
import { beforeUnload } from './redux/reducer/BeforeUnload/beforeUnload';
import Popup from './Component/PopUp/Popup';

function App({cartItems, favouriteItems, recentItems, popup}) {

  useEffect(() => {

    function unloadFun(){
      beforeUnload(cartItems, favouriteItems, recentItems);
    }
    
    window.addEventListener("beforeunload", unloadFun)

    return () => window.removeEventListener("beforeunload", unloadFun);
  },[cartItems, favouriteItems, recentItems])

  return (
    <div className="App">
       <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path =":type" element={<Product/>}/>
          <Route path =":type/:id" element={<ProductDetails/>}/>
          <Route path='/addtocart' element={<AddToCart/>}/>
          <Route path='/favourite' element={<Favourite/>}/>
       </Routes>
       {popup.isVisible && <Popup message={popup.message} type={popup.type}/>}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cartItems : state.cart,
    favouriteItems : state.favourite,
    recentItems : state.recent,
    popup : state.popup
  }
}

export default connect(mapStateToProps)(App);
