// ! 1

// ! dependencies installed:
//    react-router-dom
//    firebase
//    react-toastify
//    @reduxjs/toolkit
//    react-redux
//    notiflix
//    country-region-selector

// ! Toast
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"; // ! Routes
import {Home, Contact, Login, Register, Reset, Admin} from "./pages" // ! Pages
// ! Components
import {Header, Footer} from "./components"
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from './pages/cart/Cart';
import CheckoutDetails from './pages/checkout/CheckoutDetails';

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header/>

          <Routes>
          
            <Route path="/" element={<Home/>}/> {/* Home page */}
            <Route path="/contact" element={<Contact/>}/> {/* Home page */}

            <Route path="/login" element={<Login/>}/> {/* login page */}
            <Route path="/register" element={<Register/>}/> {/* register page */}
            <Route path="/reset" element={<Reset/>}/> {/* reset page */}

            {/* admin page -- ONLY FOR ADMIN */}
            <Route path="/admin/*" element={
              <AdminOnlyRoute>
                <Admin/>
              </AdminOnlyRoute> 
            }/>

            <Route path="/product-details/:id" element={<ProductDetails/>}/> {/* product details page */}
            <Route path="/cart" element={<Cart/>}/> {/* cart page */}
            <Route path="/checkout-details" element={<CheckoutDetails/>}/> {/* CheckoutDetails page */}

          </Routes>

        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
