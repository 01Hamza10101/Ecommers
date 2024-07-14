import React, { useState , useEffect } from 'react';
import './product-card.css';
import star from './star.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {UpdateCart} from "../../Redux/Userslice.jsx";

const Productcard = ({data}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleWeight(e) {
    console.log(e.target.value);
  }

  // console.log(data);
  return (
    <div className="card" >
        <div className="cart-1">
          <div>
            <img src={data.Image1} onClick={() => navigate(`/product/${data._id}`)} alt="img" />
          </div>
         {/* <div className="rating-colletion">
          <img src={star} alt="img" />
          <span className='star-rating'>4.9</span>
          <span>6556</span>
         </div> */}
         <div className="card-Quantity" style={{color: data.Quantity !== 0 ? "green" : "red" }}>Quantity:{data.Quantity} {data.Quantity !== 0 ? ("Product in stock") :("Product out of stock") }</div>
        </div>
        <div  className="cart-2">
          <h3 onClick={() => navigate(`/product/${data._id}`)}>{data.Title.slice(0, 40)}...</h3>
          <div className='cart-price'>
          ₹{data.CurrentPrice} <span>₹{data.OldPrice}</span>
          </div>
          <select className='cart-Weight' onChange={handleWeight} name="weight" id="weight">
            {data.ProductWeight.map((data,i)=>{
            return <option key={i}>{data}</option>
            })}
          </select>
          <button className='addtocart' onClick={() => {dispatch(UpdateCart({Productid:data._id,Pack:1}))}} disabled={data.Quantity == 0 ? true : false} >ADD TO CART</button>
          {/* <button className='buyitnow' disabled={data.Quantity == 0 ? true : false}  onClick={() => {navigate('/product/prd')}}>BUY IT NOW</button> */}
        </div>
      </div>
  )
}

export default Productcard;
