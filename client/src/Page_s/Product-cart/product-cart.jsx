import React from 'react';
import './product-cart.css';
import Cart from '../../components/Cart/cart';
const Productcart = () => {
  return (
    <div className='product-cart'>
        <div>
           <h3>Your Cart (2 items)</h3>
           <a href="/">Continue shopping</a>
        </div>
        <div>
          <Cart/>
          <Cart/>
        </div>
    </div>
  )
}

export default Productcart;
