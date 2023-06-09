// ! 1

// ! dependencies installed:
//    react-router-dom
//    firebase
//    react-toastify
//    @reduxjs/toolkit
//    react-redux

// ! Toast
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

// ! Pages
import {Home, Contact, Login, Register, Reset, Admin} from "./pages"
// ! Components
import {Header, Footer} from "./components"
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';


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

          </Routes>

        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
