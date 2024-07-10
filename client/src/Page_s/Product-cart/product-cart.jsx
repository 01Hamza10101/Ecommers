import React, { useEffect, useState } from 'react';
import './product-cart.css';
import Cart from '../../components/Cart/cart';
import { useDispatch, useSelector } from 'react-redux';
// import {GetCartProduct} from "../../Redux//Userslice.js";
import { GetCartProduct , PlaceOrder } from '../../Redux/Userslice';
import { useNavigate } from 'react-router-dom';
const Productcart = () => {
  const CartData = useSelector(state => state.User.CartData);
  const Address = useSelector(state => state.User.Address);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OnlinePayment,setOnlinePayment] = useState(true);
  const [CashOnDelivery,setCashOnDelivery] = useState(false);

  let Price = 0;
  let TotalValue = 0; 
  
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    CartData?.map((data)=>{
      Price += data.OldPrice;
    });
    CartData?.map((data)=>{
      TotalValue += data.CurrentPrice;
    });
  },[]);
  
  let DiscountVlue = Number(Price - TotalValue);

  return (
    <div className='product-cart' style={{ justifyContent: CartData.length == 0 ? 'center' : 'initial' }}>
      <div>
        <div>
           <h3>Your Cart ({CartData?.length} items)</h3>
           <a href="/">Continue shopping</a>
        </div>
        <div>
          <div className='Cart-Deliver'><span>Deliver:</span> <span>{Address?.City}</span>-<span>{Address?.PinCode}</span></div>
          {CartData && CartData.map((data,i)=>{
            return <Cart key={i} data={data}/>;
          })}
        </div>
        </div>
        {CartData.length !== 0 && (
        <div className='Cart-PriceDetls-Bill'>
          <h2>PRICE DETAILS</h2>
          <div className='Cart-Price'>
            <h5>Price ({CartData?.length} item)</h5><h5>₹{Price}</h5>
          </div>
          <div className='Cart-Discount'>
            <h5>Discount</h5><h5>− ₹{DiscountVlue}</h5>
          </div>
          <div className='Cart-Delivery-Charges'>
            <h5>Delivery Charges</h5><h5><span>₹40</span> Free</h5>
          </div>
          <div className='Cart-Total-Amount'>
            <h3>Total Amount</h3><h3>₹{TotalValue}</h3>
          </div>
          <div className='Cart-Payment-option'>
            <div className='Online-pay' onClick={()=>{setOnlinePayment(true);setCashOnDelivery(false)}}><input checked={OnlinePayment} onClick={()=>{setOnlinePayment(true);setCashOnDelivery(false)}} type="radio" /><h4 >Online Payment</h4></div>
            <div className='Cash-on-delivery' onClick={()=>{setOnlinePayment(false);setCashOnDelivery(true)}}><input checked={CashOnDelivery} onClick={()=>{setCashOnDelivery(true);setOnlinePayment(false)}} type="radio"/><h4>Cash on Delivery</h4></div>
          </div>
          <button className='Order-Place' onClick={()=>{
            dispatch(PlaceOrder({Phone:Address.MobileNumber,PaymentVia:CashOnDelivery ? "CashOnDelivery" : "OnlinePayment"}));
            }}>Place order</button>
          <h3>You will save ₹{DiscountVlue} on this order</h3>
        </div>)}
    </div>
  )
}

export default Productcart;
