import React, { useState , useRef } from 'react';
import './Product.css'
import { useNavigate,useParams } from 'react-router-dom';
import star from './star.png';
import Productcard from '../../components/Card/product-card';
const ProductPage = () => {
    // const {productid} = useParams();
    const [pinerror,setPinerror] = useState(true);
    const [productValue, setProductValue] = useState(1);
    const [expandedseldes, setExpandedseldes] = useState(false);
    const [expandeddes, setExpandeddes] = useState(false);

  return (
  <div className='product'>
    <div>
    <div className='productleft'>
        <div className='product-img'>
            <div>
                <img src="https://rukminim2.flixcart.com/image/128/128/xif0q/jam-spread/t/w/m/-original-imagvrdz526easnv.jpeg?q=70&crop=false" alt="img" />
                <img src="https://rukminim2.flixcart.com/image/128/128/xif0q/jam-spread/t/w/m/-original-imagvrdz526easnv.jpeg?q=70&crop=false" alt="img" />
                {/* <img src="//kmyfitness.in/cdn/shop/files/510g-pack-of-2---chocolate-smooth-_-Olympia-smooth.jpg?v=1691654810&width=800" alt="img" /> */}
            </div>
            <div>
                <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/jam-spread/t/w/m/-original-imagvrdz526easnv.jpeg?q=70&crop=false" alt="img" />
            </div>
        </div>
        <div className='buttons'>
            <button>ADD TO CART</button>
            <button>BUY NOW</button>
        </div>
    </div>
    <div className='productright' >
        <div className='product-details'>
            <h2>MYFITNESS Chocolate Peanut Butter (Smooth) 510 g</h2>
             <div className="rating-colletion">
               <img src={star} alt="img" />
               <span className='star-rating'>4.9</span>
               <span>6556</span>
             </div>
             <h2>₹ 300 <span>₹ 500</span></h2>
             <div className='islocationAvl'>
                <h3>Delivery</h3>
                <div>
                    <img src="https://cdn0.iconfinder.com/data/icons/aami-flat-map-pins-and-navigation/64/location-06-512.png" alt="img" />
                    <input type="text" pattern="[0-9]{6}" maxLength="6" placeholder="Enter your pincode" onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericInput = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                      e.target.value = numericInput;
                    }} />

                    <button>Check</button>
                </div>
             </div>
             {pinerror && (<h6>Pincode not valid. Try another one.</h6>)}
             <div className='quantity'>
                <h3>Quantity</h3>
                <div>
                    <div>
                        510 g
                    </div>
                    <div>
                        1250 g
                    </div>
                    <div>
                        2000 g
                    </div>
                    <div>
                        3000 g
                    </div>
                </div>  
             </div>
             <div className='Packof'>
                <h3>Pack of</h3>
                <div>
                    <div onClick={() => {
                         if (!isNaN(productValue) && productValue !== 1) {
                            setProductValue(parseInt(productValue) - 1);
                        }
                    }}>-</div>
                    <input type="text" value={productValue} maxLength="1"/>
                    <div onClick={() => {
                         if (!isNaN(productValue) && productValue !== 10) {
                            setProductValue(parseInt(productValue) + 1);
                        }
                        if(productValue == 10 ){
                            alert('Maximum limit is 10');
                        }
                    }}>+</div>
                </div>  
             </div>
             <div className='highlights'>
                <h3>Highlights</h3>
                <div>
                   <li>Antioxidants</li>
                   <li>Vitamin & Minerals</li>
                   <li>High Protein</li>
                   <li>Energy Booster</li>
                </div>  
             </div>
             <div className='productdes'>
                <div onClick={() =>  expandeddes ? setExpandeddes(false) : setExpandeddes(true)}>
                  <h3>PRODUCT DESCRIPTION</h3>
                  <img src="https://cdn0.iconfinder.com/data/icons/solid-line-essential-ui-icon-set/512/essential_set_down-512.png" alt="img" style={{transform: expandeddes ? 'rotate(180deg)' : 'rotate(0deg)'}} />
                </div>
                {expandeddes && (<div style={{ height: expandeddes ? 'auto' : '0', transition: 'height 0.3s, opacity 0.3s, padding 0.3s' }}>
                 <span> Get ready for a delicious snack with our combo pack!</span>
                 <br />
                  <span>MyFitness Chocolate & Olympia Peanut Butter is the perfect way to fuel your body with the power of protein and indulge in a delicious taste.</span>
                  <br />
                  <span>Made with the finest ingredients, the Olympia spread is packed with added whey protein to support your fitness goal. And if you're looking to curb your chocolate cravings, then the Chocolate variant is just what you need. It's a delicious blend of unsweetened Belgian chocolate and 100% roasted peanuts, making it the perfect protein snack.</span>
                  <br />
                  <span>So why wait? Indulge in the perfect balance of taste and nutrition by trying our Chocolate Smooth and Olympia Smooth Duo Pack today!</span>
                  <h4>Gross Weight : 1.2 kg</h4>
                </div>)}
             </div>
             <div className='productsellerdes'>
                <div onClick={() =>  expandedseldes ? setExpandedseldes(false) : setExpandedseldes(true)}>
                  <h3>SUPPLIER INFORMATION</h3>
                  <img src="https://cdn0.iconfinder.com/data/icons/solid-line-essential-ui-icon-set/512/essential_set_down-512.png" alt="img" style={{transform: expandedseldes ? 'rotate(180deg)' : 'rotate(0deg)'}} />
                </div>
                { expandedseldes && (
                <div style={{ height: expandedseldes ? 'auto' : '0', transition: 'height 3s' }}>
                <span> Get ready for a delicious snack with our combo pack!</span>
                 <br />
                  <span>MyFitness Chocolate & Olympia Peanut Butter is the perfect way to fuel your body with the power of protein and indulge in a delicious taste.</span>
                  <br />
                  <span>Made with the finest ingredients, the Olympia spread is packed with added whey protein to support your fitness goal. And if you're looking to curb your chocolate cravings, then the Chocolate variant is just what you need. It's a delicious blend of unsweetened Belgian chocolate and 100% roasted peanuts, making it the perfect protein snack.</span>
                  <br />
                  <span>So why wait? Indulge in the perfect balance of taste and nutrition by trying our Chocolate Smooth and Olympia Smooth Duo Pack today!</span>
                  <h4>Gross Weight : 510 g</h4>
                </div>)}
             </div>
        </div>

    </div>
    </div>
    <div>
        <Productcard/>
        <Productcard/>
        <Productcard/>
        <Productcard/>
        <Productcard/>
        <Productcard/>
        <Productcard/>
    </div>
  </div>
  );
}

export default ProductPage;