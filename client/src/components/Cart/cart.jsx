import React,{useState} from 'react';
import star from './star.png';
import del from './del.png';
import { useNavigate } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const [productValue, setProductValue] = useState(1);
  let navigate = useNavigate();
  return (
    <div className="cart-product-card" > 
            <img src="//myfitness.in/cdn/shop/files/choc_Smooth_b62d0b21-1b20-43d6-a154-8b699a109c45_95x95@2x.jpg?v=1703254525" alt="img" />
            <h2 onClick={() => {navigate('/product/prd')}}>Chocolate Peanut Butter: Smooth</h2>
            <h3>₹ 300 <span>₹ 200</span></h3>
            <div className="rating-colletion">
              <img src={star} alt="img" />
              <span className='star-rating'>4.9</span>
              <span>6556</span>
            </div>
          <div className='Pack-of'>
                {productValue === 1 ? false : true && (<div onClick={() => {
                      if (!isNaN(productValue) && productValue !== 1) {
                            setProductValue(parseInt(productValue) - 1);
                        }
                }}>-</div>)}

                {productValue === 1 && (
                  <div>
                     <img src={del} alt="img" />
                  </div>)}
                  
                <input type="text" value={productValue} maxLength="1"/>
                <div className='packof-plus' onClick={() => {
                      if (!isNaN(productValue) && productValue !== 10) {
                            setProductValue(parseInt(productValue) + 1);
                        }
                      if(productValue == 10 ){
                            alert('Maximum limit is 10');
                        }
                }}>+</div>
            </div>  
    </div>
  )
}

export default Cart;
