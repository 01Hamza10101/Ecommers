import React, { useState , useRef, useEffect } from 'react';
import './add-product.css';
import { useNavigate,useParams } from 'react-router-dom';
import star from '../../Page_s/Product/star.png';

const AddProduct = () => {
    // const {productid} = useParams();
    const [pinerror,setPinerror] = useState(true);
    const [productValue, setProductValue] = useState(1);
    const [expandedseldes, setExpandedseldes] = useState(false);
    const [expandeddes, setExpandeddes] = useState(false);

    const textareaRef = useRef(null);
    const [titleContent,setTitleContent] = useState('');
    const [titlerows,setTitlerows] = useState(1);
   
    const handleTextareaChange = (e) => {
        setTitleContent(e.target.value);
        // const lineHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight) || 16;
        // const rows = Math.floor(textareaRef.current.scrollHeight / lineHeight);
        // setTitlerows(rows);
    };
    const [productdesAray,setProductdesAray] = useState([]);
    const [productselldesAray,setProductselldesAray] = useState([]);
    const [productdes,setProductdes] = useState([]);
    const [productselldes,setProductselldes] = useState([]);
    const [isBold,setIsBold] = useState(false);
    
    function handletextarea(e){
        if (e.key == 'Enter'){
        setProductdesAray([...productdesAray,productdes]);
        setProductdes({ value: '', isBold: '' });
    }
    }
    function handletextsellarea(e){
        if (e.key == 'Enter'){
        setProductselldesAray([...productselldesAray,productselldes]);
        setProductselldes({value:'',isBold:''});
    }
    }
  return (
  <div className='add-product'>
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
            {/* <h2>MYFITNESS Chocolate Peanut Butter (Smooth) 510 g </h2> */}
            <input
                        placeholder='enter title '
                        ref={textareaRef}
                        className='title'
                        type="text"
                        rows={titlerows}
                        value={titleContent}
                        onChange={handleTextareaChange}
            />

             {/* <div className="rating-colletion">
               <img src={star} alt="img" />
               <span className='star-rating'>4.9</span>
               <span>6556</span>
             </div> */}
             <h2>₹ 300 <span>₹ 500</span></h2>
             <div>
                ₹ <input
                        placeholder='enter new price '
                        className='price'
                        type="text"
                        rows='1'
                        // value={titleContent}
                        onChange={handleTextareaChange}
                />
                ₹ <input
                        placeholder='enter old price '
                        className='price'
                        type="text"
                        rows='1'
                        // value={titleContent}
                        onChange={handleTextareaChange}
                />
             </div>
             <div className='islocationAvl'>
                <h3>Product available on [Pincode's]:</h3>
                {/* <div>
                    <img src="https://cdn0.iconfinder.com/data/icons/aami-flat-map-pins-and-navigation/64/location-06-512.png" alt="img" />
                    <input type="text" pattern="[0-9]{6}" maxLength="6" placeholder="Enter your pincode" onChange={(e) => {
                      const inputValue = e.target.value;
                      const numericInput = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                      e.target.value = numericInput;
                    }} />

                    <button>Check</button>
                </div> */}
                <div className='div-pincodes'>
                    <div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                       <div>812005 <span>+</span></div>
                    </div>
                    <input
                        placeholder='enter pincodes'
                        className='pincodes'
                        type="text"
                        rows='1'
                        // value={titleContent}
                        // onChange={hasndleTextareaChange}
                    />
                </div>
             </div>
             {/* {pinerror && (<h6>Pincode not valid. Try another one.</h6>)} */}
             <div className='quantity'>
                <h3>Quantity</h3>
                {/* <div>
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
                </div>  */}
                <div>
                    <div>
                       <div>510g <span>+</span></div>
                       {/* <div>1250g <span>+</span></div>
                       <div>2050g <span>x</span></div> */}
                    </div>
                    <input
                        placeholder='enter pincodes'
                        className='pincodes'
                        type="text"
                        rows='1'
                        // value={titleContent}
                        // onChange={hasndleTextareaChange}
                    />
                    <button className='enter-btn'>enter</button>
                </div> 
             </div>
             {/* <div className='Packof'>
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
             </div> */}
             <div className='highlights'>
                <h3>Highlights</h3>
                <div>
                   {/* <li>Antioxidants</li>
                   <li>Vitamin & Minerals</li>
                   <li>High Protein</li>
                   <li>Energy Booster</li> */}
                   <input
                        placeholder='enter highlight'
                        className='input-highlight'
                        type="text"
                        rows='1'
                        // value={titleContent}
                        // onChange={hasndleTextareaChange}
                    />
                    <button className='enter-btn'>enter</button>
                </div>  
             </div>
             <div className='productdes'>
                <div onClick={() =>  setExpandeddes(data => !data) }>
                  <h3>PRODUCT DESCRIPTION</h3>
                  <img src="https://cdn0.iconfinder.com/data/icons/solid-line-essential-ui-icon-set/512/essential_set_down-512.png" alt="img" style={{transform: expandeddes ? 'rotate(180deg)' : 'rotate(0deg)'}} />
                </div>
                {expandeddes && (<div style={{ height: expandeddes ? 'auto' : '0', transition: 'height 0.3s, opacity 0.3s, padding 0.3s' }}>
                 {/* <span> Get ready for a delicious snack with our combo pack!</span>
                 <br />
                  <span>MyFitness Chocolate & Olympia Peanut Butter is the perfect way to fuel your body with the power of protein and indulge in a delicious taste.</span>
                  <br />
                  <span>Made with the finest ingredients, the Olympia spread is packed with added whey protein to support your fitness goal. And if you're looking to curb your chocolate cravings, then the Chocolate variant is just what you need. It's a delicious blend of unsweetened Belgian chocolate and 100% roasted peanuts, making it the perfect protein snack.</span>
                  <br />
                  <span>So why wait? Indulge in the perfect balance of taste and nutrition by trying our Chocolate Smooth and Olympia Smooth Duo Pack today!</span>
                  <h4>Gross Weight : 1.2 kg</h4> */}
                  <div>
                    {productdesAray && productdesAray.map((data,id)=>{
                        if (data.isBold){
                        return <h4 style={{ margin: '0px 0px 0px 0px' }} key={id}><li>{data.value}</li></h4>
                        }
                        if(!data.isBold){
                            return <li key={id}>{data.value}</li>
                        }
                    })}
                  </div>
                <textarea type="text" value={productdes.value} onChange={(e) => {setProductdes({ value:e.target.value,isBold})}} onKeyUp={handletextarea} className='input'/> 
                <button style={{background:isBold ? 'black' : 'white',color: isBold ? 'white':'black'}} onClick={(e)=>{
                    setIsBold(data => !data);
                }}>B</button>
                </div>)}
             </div>
             <div className='productsellerdes'>
                <div onClick={() =>  expandedseldes ? setExpandedseldes(false) : setExpandedseldes(true)}>
                  <h3>SUPPLIER INFORMATION</h3>
                  <img src="https://cdn0.iconfinder.com/data/icons/solid-line-essential-ui-icon-set/512/essential_set_down-512.png" alt="img" style={{transform: expandedseldes ? 'rotate(180deg)' : 'rotate(0deg)'}} />
                </div>
                { expandedseldes && (
                <div style={{ height: expandedseldes ? 'auto' : '0', transition: 'height 3s' }}>
                {/* <span> Get ready for a delicious snack with our combo pack!</span>
                 <br />
                  <span>MyFitness Chocolate & Olympia Peanut Butter is the perfect way to fuel your body with the power of protein and indulge in a delicious taste.</span>
                  <br />
                  <span>Made with the finest ingredients, the Olympia spread is packed with added whey protein to support your fitness goal. And if you're looking to curb your chocolate cravings, then the Chocolate variant is just what you need. It's a delicious blend of unsweetened Belgian chocolate and 100% roasted peanuts, making it the perfect protein snack.</span>
                  <br />
                  <span>So why wait? Indulge in the perfect balance of taste and nutrition by trying our Chocolate Smooth and Olympia Smooth Duo Pack today!</span>
                  <h4>Gross Weight : 510 g</h4> */}
                 <div>
                    {productselldesAray && productselldesAray.map((data,id)=>{
                        if (data.isBold){
                        return <h4 style={{ margin: '0px 0px 0px 0px' }} key={id}><li>{data.value}</li></h4>
                        }
                        if(!data.isBold){
                            return <li key={id}>{data.value}</li>
                        }
                    })}
                  </div>
                <textarea type="text" value={productselldes.value} onChange={(e) => {setProductselldes({ value:e.target.value,isBold})}} onKeyUp={handletextsellarea} className='input'/> 
                <button style={{height:'25px',width:'50px',fontSize:'600',borderRadius:'4px',background:isBold ? 'black' : 'white',color: isBold ? 'white':'black'}} onClick={(e)=>{
                    setIsBold(data => !data);
                }}>B</button>
                </div>)}
             </div>
        </div>

    </div>
    </div>
  </div>
  );
}

export default AddProduct;