import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';

function App() {
  return (
    <div className="App">
       <Navbar/>

       <Routes>
          <Route path='/' element={<Home/>}/>
       </Routes>
    </div>
  );
}

export default App;
