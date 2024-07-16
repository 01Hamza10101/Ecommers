import React, { useEffect, useState } from 'react';
import './Layout.css';
import searchimg from '../Home/search.png';
import cartimg from '../Home/cart.png';
import profileimg from '../Home/profile.png';
import menuimg from '../Home/menu.png';
import star from '../Home/star.png';
import insta from '../Home/instagram.png';
import linkdin from '../Home/linkdin.png';
import order from '../Home/shopping-bag.png';

import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GetCartProduct } from '../../Redux/Userslice';

const Layout = ({seller}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [Company,setCompany] = useState(false);
  const [Support,setSupport] = useState(false);
  const [Token,setToken] = useState( null || localStorage.getItem("token"));

  const handleNavigate = (data) => {
    const token = localStorage.getItem("token");
    if (token == null) {
        navigate("/login");
        return;
    }
    switch (data) {
        case "cart":
            navigate("/cart");
            break;
        case "profile":
            navigate("/profile");
            break;
        case "order":
            navigate("/orders");
            break;
        case "logout":
            localStorage.removeItem("token");
            setToken(null);
            navigate("/");
            break;
        default:
            navigate("/login");
    }
  };
  function handleStyleLogout(){
    return Token == null ? "brightness(0) invert(0.4)" : "brightness(0) invert(1)";
  };
  // function handleStyleLogoutCursor(){
  //   return Token == null ? "not-allowed" : "";
  // }
    return (
   <>
   <div className='NavBar'>
    <img src="https://cdn.shopify.com/s/files/1/0440/7921/8842/files/WEBSITE_LOGO.svg?v=1626866898" alt="img" onClick={()=>{
      navigate('/')
    }} />
    <div className='div-2'>
      {!seller && <> <img  className='search-img' src={searchimg} alt="img" onClick={() => {navigate('/searchresult')}}/>
      <img style={{ filter: handleStyleLogout()}} className='cart-img' src={cartimg} alt="img" onClick={() => {handleNavigate("cart");dispatch(GetCartProduct())}}/>
      <img style={{ filter: handleStyleLogout()}} className='profile-img' src={profileimg} alt="img" onClick={() => {handleNavigate("profile")}} />
      <img style={{ filter: handleStyleLogout()}} className='profile-img' src={order} alt="img" onClick={() => {handleNavigate("order")}} />
      {Token !== null && (<img className='Logout-img' src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/logout-e63ddf.svg" alt="img" onClick={()=>{handleNavigate("logout")}} />)} 
      </>}
      {seller && <> 
      <img className='profile-img' src={'profileimg'} alt="invetory" onClick={() => navigate('/seller/inventory') } />
      <img className='profile-img' src={'profileimg'} alt="orders" onClick={() => navigate('/seller/orders') } />
      <img className='profile-img' src={'profileimg'} alt="addProduct" onClick={() => navigate('/seller/add-product') } />
      <img className='profile-img' src={profileimg} alt="img" onClick={() => navigate('/seller/profile') } />
       </>}
    </div>
   </div>
     <div className='Outlet-child'>
        {<Outlet/>}
     </div>
   <div className='div-footer-contaner'>

      <div className='div-footer'>
        <div className='upper'>
        <div >
            <img src="//myfitness.in/cdn/shop/files/fastshipping_svg.svg?v=1676486675&width=300" alt="img" />
            <p>Free Shipping</p>
        </div>
        <div >
            <img src="//myfitness.in/cdn/shop/files/fastshipping_svg.svg?v=1676486675&width=300" alt="img" />
            <p>Free Shipping</p>
        </div>
        <div >
            <img src="//myfitness.in/cdn/shop/files/securecheckout_svg.svg?v=1676486676&width=300" alt="img" />
            <p>Free Shipping</p>
        </div>
        </div>

        <div className='div-summary'>
            
            <div className='div-company'>
              <p>COMPANY</p>
              {Company && (<div>
              <a href="">About Us</a>
              <a href="">Our Certificates</a>
              <a href="">Recipes</a>
              <a href="">Blogs</a>
              <a href="">Behind The Scenes</a>
              </div>)}
            </div>
            <div className='div-support'>
              <p>SUPPORT</p>
              {Support && (<div>
              <a href="">About Us</a>
              <a href="">Our Certificates</a>
              <a href="">Recipes</a>
              <a href="">Blogs</a>
              <a href="">Behind The Scenes</a>
              </div>)}
            </div>
            <div className='div-getintouch'>
              <p>GET IN TOUCH</p>
              <div>
                <p>
                Tanvi Fitness Private Limited,
                Vaishnavi Properties, #30/1, Silicon Terraces, 2nd and 3rd Floor, Adugodi, Hosur Main Road, Koramangala, Bengaluru – 560095
                </p>
                
                <h5>For queries and feedback, write to us at: </h5>
                <p>
                Email: care@myfitness.co.in
                Customer care phone no:+91 7096699111
                Opening Hours:Monday to Sunday: 10am - 7pm
                </p>
                <div className='social-media'>
                  <img src={insta} alt="img" />
                  <img src={linkdin} alt="imglingk" />
                </div>
              </div>
            </div>
            <div className='myfitness'>
            © 2024 MYFITNESS
            </div>
        </div>
        
      </div>
    </div>
   </>
  );
}

export default Layout;