import React from 'react';
import './product-card.css';
import star from './star.png';
import { useNavigate } from 'react-router-dom';
const Productcard = () => {
  const navigate = useNavigate();
  return (
    <div className="card">
        <div className="cart-1">
          <div>
           <img src="//myfitness.in/cdn/shop/files/choc_Smooth_b62d0b21-1b20-43d6-a154-8b699a109c45.jpg?v=1703254525&width=800" alt="img" />
          </div>
         <div className="rating-colletion">
          <img src={star} alt="img" />
          <span className='star-rating'>4.9</span>
          <span>6556</span>
         </div>
        </div>
        <div  className="cart-2">
          <h3>Chocolate Peanut Butter: Smooth</h3>
          <div className='card-fetures'>
            <div className="card-feture">Velvety Smooth</div>
            <div className="card-feture">Zero Cholestrol</div>
          </div>
          <div className='cart-price'>
          ₹ 300 <span>₹ 500</span>
          </div>
          <select className='cart-Weight' name="weight" id="weight">
            <option >1.25 Kg</option>
            <option >510 g</option>
          </select>
          <button className='addtocart'>ADD TO CART</button>
          <button className='buyitnow'  onClick={() => {navigate('/product/prd')}}>BUY IT NOW</button>
        </div>
      </div>
  )
}

export default Productcard;
