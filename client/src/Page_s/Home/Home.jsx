import React, { useState } from 'react';
import './Home.css';
import searchimg from './search.png';
import cartimg from './cart.png';
import profileimg from './profile.png';
import menuimg from './menu.png';
import star from './star.png';
import insta from './instagram.png';
import linkdin from './linkdin.png';
import Productcard from '../../components/Card/product-card';
import { useSelector,useDispatch } from 'react-redux';

const HomePage = () => {
  const ProductData = useSelector((state) => state.User.ProductData)
  
    return (
   <>
   <div>
     <div className='Home-body'>
      <div className='product-cetogery'>
      <div className='product-1'>
          <div className='product-1-image'>
            <img src="//myfitness.in/cdn/shop/collections/All_Products_1.webp?v=1706885676&width=500" alt="" />
          </div>
          <span>All products</span>
        </div>
        <div className='product-1'>
          <div className='product-1-image'>
            <img src="https://myfitness.in/cdn/shop/collections/New_Arrival.webp?v=1708332643&width=500" alt="" />
          </div>
          <span>New Arrivals</span>
        </div>
      </div>
      <h2>BEST SELLERS</h2>

      {/* Product Card */}
      <div className='product-card'>
        {ProductData && ProductData.map((data,index) => {
          return <Productcard key={index} data={data}/>
        })}
      </div>

      <div className='video-banner'>
      <h2>HEALTH KA TASTY PARTNER</h2>
      <div className='video-banner-inner'>
        <video controls loop muted disablePictureInPicture src="https://cdn.shopify.com/videos/c/o/v/9159bf9b2bea42e4b22f148126c7444e.mp4"></video>
        <div className='video-banner-img'>
           <img src="//myfitness.in/cdn/shop/files/BBQ_2.jpg?v=1691560754" alt="img" />
           <img src="//myfitness.in/cdn/shop/files/Schezwan_1.jpg?v=1691560787" alt="img" />
        </div>
      </div>
      </div>
      
      <div className='div-coverage'>
        <h2>PRESS COVERAGE</h2>
        <div>
          <div className="div-press-coverage">
              <img src="https://myfitness.in/cdn/shop/files/brand2_1.png?v=1706074827&width=300" alt="img" />
          </div>
          <div className="div-press-coverage">
              <img src="https://myfitness.in/cdn/shop/files/brand1.png?v=1706074827&width=300" alt="img" />
          </div>
          <div className="div-press-coverage">
              <img src="https://myfitness.in/cdn/shop/files/brand3.png?v=1706074826&width=300" alt="img" />
          </div>
          <div className="div-press-coverage">
              <img src="https://myfitness.in/cdn/shop/files/brand4.png?v=1706074826&width=300" alt="img" />
          </div>
        </div>
      </div>
      
      <div className='div-coverage'>
        <h2>LEADING BRAND ON MARKETPLACES</h2>
        <div>
          <div className="div-press-coverage">
              <img src="https://myfitness.in/cdn/shop/files/brand5.png?v=1706074827&width=300" alt="img" />
          </div>
          <div className="div-press-coverage">
              <img src="//myfitness.in/cdn/shop/files/Swiggy_logo_svg.png?v=1707228841&width=300" alt="img" />
          </div>
          <div className="div-press-coverage">
              <img src="https://myfitness.in/cdn/shop/files/brand7.png?v=1706074826&width=300" alt="img" />
          </div>
          <div className="div-press-coverage">
              <img src="//myfitness.in/cdn/shop/files/JioMart-Logo.jpg?v=1707229025&width=300" alt="img" />
          </div>
        </div>
      </div>
    </div>
    </div>
   </>
  );
}

export default HomePage;