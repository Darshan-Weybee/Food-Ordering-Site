import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Home from './Page/Home/Home';
import Product from './Page/Product/Product';
import { Provider } from 'react-redux';
import store from './redux/rootReducer/store';
import ProductDetails from './Page/ProductDetails/ProductDetails';
import AddToCart from './Page/AddToCart/AddToCart';
import Favourite from './Page/Favourite/Favourite';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
       <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path =":type" element={<Product/>}/>
          <Route path =":type/:id" element={<ProductDetails/>}/>
          <Route path='/addtocart' element={<AddToCart/>}/>
          <Route path='/favourite' element={<Favourite/>}/>
       </Routes>
    </div>
    </Provider>
  );
}

export default App;
