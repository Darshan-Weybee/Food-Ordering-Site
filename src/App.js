import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
import Product from './Component/Product/Product';
import { Provider } from 'react-redux';
import store from './Component/Reducer/Store';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import AddToCart from './Component/AddToCart/AddToCart';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
       <Navbar/>

       <Routes>
          <Route path='/' element={<Home/>}>
            <Route path =":type" element={<Product/>}>
              <Route path =":id" element={<ProductDetails/>}/>
            </Route>
          </Route>
          <Route path='/addtocart' element={<AddToCart/>}/>
       </Routes>
    </div>
    </Provider>
  );
}

export default App;
