import React, { useState } from 'react';
import star from './star.png';
import del from './del.png';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { useDispatch } from 'react-redux';
import { DeleteCartProduct } from "../../Redux/Userslice.jsx";

const Cart = ({ data }) => {
  const dispatch = useDispatch();
  const [productValue, setProductValue] = useState(1);
  let navigate = useNavigate();

  const handleDecrease = () => {
    if (productValue > 1) {
      setProductValue(productValue - 1);
    }
  };

  const handleIncrease = () => {
    if (productValue < 10) {
      setProductValue(productValue + 1);
    } else {
      alert('Maximum limit is 10');
    }
  };

  return (
    <div className="cart-product-card"> 
      <img src={data?.Image1} alt="img" />
      <h2 onClick={() => navigate(`/product/${data._id}`)}>
        {data?.Title.slice(0, 40)}...
      </h2>
      <h3>₹ {data?.CurrentPrice} <span>₹ {data?.OldPrice}</span></h3>

      <div className='Pack-of'>
        {productValue > 1 && (
          <div onClick={handleDecrease}>-</div>
        )}

        {productValue === 1 && (
          <div onClick={() => dispatch(DeleteCartProduct(data._id))}>
            <img src={del} alt="Delete" />
          </div>
        )}
          
        <input 
          type="text" 
          value={productValue} 
          readOnly 
          maxLength="2" 
        />

        <div className='packof-plus' onClick={handleIncrease}>+</div>
      </div>  
    </div>
  );
};

export default Cart;
