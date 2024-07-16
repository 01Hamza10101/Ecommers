import React, { useEffect, useState } from 'react';
import './product-cart.css';
import Cart from '../../components/Cart/cart';
import { useDispatch, useSelector } from 'react-redux';
import { GetCartProduct , PlaceOrder } from '../../Redux/Userslice.jsx';
import { useNavigate } from 'react-router-dom';

const Productcart = () => {
  const CartData = useSelector(state => state.User.CartData);
  const Address = useSelector(state => state.User.Address);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [OnlinePayment,setOnlinePayment] = useState(true);
  const [CashOnDelivery,setCashOnDelivery] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    if(token !== null){
    dispatch(GetCartProduct());
    }
  },[]);
  
  let Price = 0;
  let TotalValue = 0; 
  
  CartData?.map((data)=>{
    Price += data.OldPrice;
  });
  CartData?.map((data)=>{
    TotalValue += data.CurrentPrice;
  });
  let DiscountVlue = Number(Price - TotalValue);
  const [ConfirmOrder,setConfirmOrder] = useState();
  const [InputCaptcha,setInputCaptcha] = useState();
  
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // Generate a simple text-based CAPTCHA with 6 characters
  const [Captcha,setCaptcha] = useState();
  function generateCaptcha() {
    const captchaLength = 6; // Length of the CAPTCHA text
    const captchaText = generateRandomString(captchaLength); // Generate random text
    setCaptcha(captchaText);
  }
  const [rotated, setRotated] = useState(false);
  return (
    <>
    <div className='product-cart' style={{ justifyContent: CartData?.length == 0 ? 'center' : 'initial' }}>
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
        {CartData?.length !== 0 && (
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
            <div className='Cash-on-delivery' onClick={()=>{
              // setOnlinePayment(false);setCashOnDelivery(true)
              }}><input className='disabled' checked={CashOnDelivery} disabled onClick={()=>{setCashOnDelivery(true);setOnlinePayment(false)}} type="radio"/><h4 className='disabled'>Cash on Delivery</h4></div>
          </div>
          <button className='Order-Place' onClick={()=>{
            setConfirmOrder(true);
            generateCaptcha();
            }}>Place order</button>
          <h3>You will save ₹{DiscountVlue} on this order</h3>
        </div>)}
        {ConfirmOrder && (
        <div className='Confirm-Order'>
          <div className='Confirm-Order-notification'>
            <div>{Captcha}<img src='https://cdn-icons-png.flaticon.com/512/44/44199.png' style={{transform: rotated ? "rotate(360deg)":"rotate(0deg)"}} onClick={() => {generateCaptcha();setRotated(state => !state)}}/></div>
            <input type="text" value={InputCaptcha} onChange={(e) => setInputCaptcha(e.target.value)} />
            <button onClick={()=> {
              if(InputCaptcha === Captcha){
                dispatch(PlaceOrder({Phone:Address.MobileNumber,TotalAmount:TotalValue,PaymentVia:CashOnDelivery ? "CashOnDelivery" : "OnlinePayment"}));
                // navigate("/");
              }
              if(InputCaptcha !== Captcha){
                alert("Captcha is not valid");
              }
            }}>Confirm order</button>
            <button onClick={()=> setConfirmOrder(false)}>Return to payment options</button>
          </div>
        </div>)}
    </div>
        {CartData?.length == 0 && <h1 style={{textAlign:'center',height: "120px"}}>You have no products in your cart.</h1> }</>
  )
}

export default Productcart;
