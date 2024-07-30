import { Route, Routes } from 'react-router-dom'
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import ProductDetails from './Components/ProductDetails';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products isHomepage={0} itemsPerPage={8}/>}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes> 
      <Footer />
    </>
  )
}


export default App;