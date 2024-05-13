import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Page\_s/Layout/Layout.jsx';
import LoginForm from './Page\_s/Login/Login.jsx';
import SignupForm from './Page\_s/Signup/Signup.jsx';
import HomePage from './Page\_s/Home/Home.jsx';
import SearchResult from './Page\_s/SearchResult/Searchresult.jsx';
import ProfileForm from './Page\_s/Profile/profile.jsx';
import FogotPasswordform from './Page\_s/Forgot-password/forgot-password.jsx';
import ProductPage from './Page\_s/Product/Product.jsx';
import Productcart from './Page\_s/Product-cart/product-cart.jsx';

// Seller Home page
import SHome from './SellerPage\_s/Home/SHome.jsx';
import  AddProduct from "./SellerPage\_s/Add-product/add-product";
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<Layout />}>
            <Route index element={<HomePage/>}/>
            <Route path='login' element={<LoginForm/>}> </Route>
            <Route path='signup' element={<SignupForm/>}/>
            <Route path='searchresult' element={<SearchResult/>}/>
            <Route path='profile' element={<ProfileForm/>}/>
            <Route path='forgot-password' element={<FogotPasswordform/>}/>
            <Route path='product/:productid' element={<ProductPage/>}/>
            <Route path='cart' element={<Productcart/>}/>            
          </Route>
          <Route  path="/seller" element={<Layout seller='true' />}>
            <Route index element={<SHome/>}/>
            <Route path='add-product' element={<AddProduct/>}/>
            
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
