import React,{useState} from 'react';
import star from './star.png';
import del from './del.png';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { useDispatch } from 'react-redux';
import {DeleteCartProduct} from "../../Redux/Userslice.jsx";

const Cart = ({data}) => {
  const dispatch = useDispatch();
  const [productValue, setProductValue] = useState(1);
  let navigate = useNavigate();
  
  return (
    <div className="cart-product-card" > 
            <img src={data?.Image1} alt="img" />
            <h2 onClick={() => {navigate(`/product/${data._id}`)}}>{data?.Title}</h2>
            <h3>₹ {data?.CurrentPrice} <span>₹ {data?.OldPrice}</span></h3>
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
                  <div onClick={()=> {dispatch(DeleteCartProduct(data._id))}}>
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
