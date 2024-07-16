import React, { useState, useEffect } from 'react';
import './Product.css';
import { useParams } from 'react-router-dom';
import star from './star.png';
import Productcard from '../../components/Card/product-card';
import { UpdateCart } from '../../Redux/Userslice.jsx';
import { useDispatch ,useSelector } from 'react-redux';

const ProductPage = () => {
    const ProductsArray = useSelector(state => state.User.ProductData);
    const { productid } = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    
    useEffect(() => {
        if (!ProductsArray) return; 
        const foundProduct = ProductsArray.find(product => product._id === productid);
        
        if (foundProduct) {
            setData(foundProduct);
        } else {
            setData(null);
        }
    }, [ProductsArray, productid]);

    const [pinerror, setPinerror] = useState("");
    const [productValue, setProductValue] = useState(1);
    const [expandedseldes, setExpandedseldes] = useState(false);
    const [expandeddes, setExpandeddes] = useState(false);
    const [showimg, setShowimg] = useState(null); // Initialize showimg as null
    const [Pincode, setPincode] = useState(null);

    function handlePincode() {
        if (!data) return; // Handle case where data is not yet loaded

        if (Pincode.trim() === '') {
            setPinerror(false); // Handle empty pincode scenario
            return;
        }

        // Check if Pincode exists in data.Pincode array
        const isValidPincode = data.Pincode.includes(Pincode);
        if (isValidPincode) {
            setPinerror(<h6 style={{ color: "green" }}>Delivery available</h6>);
        } else {
            setPinerror(<h6>Pincode not valid. Try another one.</h6>);
        }
    }


    return (<> {data && (
        <div className='product'>
            <div className='productleft'>
                <div className='product-img'>
                    <div>
                        <img src={data.Image1} alt="img" onClick={() => setShowimg(data.Image1)} />
                        <img src={data.Image2} alt="img" onClick={() => setShowimg(data.Image2)} />
                        <img src={data.Image3} alt="img" onClick={() => setShowimg(data.Image3)} />
                        <img src={data.Image4} alt="img" onClick={() => setShowimg(data.Image4)} />
                    </div>
                    <div>
                        <img src={showimg || data.Image1} alt="img" /> {/* Use showimg or default to Image1 */}
                    </div>
                </div>
                <div className='buttons'>
                    <button onClick={() => dispatch(UpdateCart({Productid:data._id,Pack:1}))}>ADD TO CART</button>
                    {/* <button>BUY NOW</button> */}
                </div>
            </div>
            <div className='productright'>
                <div className='product-details'>
                    <h2>{data.Title}</h2>
                    <div className="rating-colletion">
                        <img src={star} alt="img" />
                        <span className='star-rating'>4.9</span>
                        <span>6556</span>
                    </div>
                    <h2>₹ {data.CurrentPrice} <span>₹ {data.OldPrice}</span></h2>
                    <div className='islocationAvl'>
                        <h3>Delivery</h3>
                        <div>
                            <img src="https://cdn0.iconfinder.com/data/icons/aami-flat-map-pins-and-navigation/64/location-06-512.png" alt="img" />
                            <input type="text" pattern="[0-9]{6}" maxLength="6" placeholder="Enter your pincode" value={Pincode} onChange={(e) => {
                                setPincode(e.target.value.replace(/[^0-9]/g, ''));
                            }} />
                            <button onClick={handlePincode}>Check</button>
                        </div>
                    </div>
                    <div className='pinerror'>
                        {pinerror}
                    </div>
                    <div className='quantity'>
                        <h3>Weight</h3>
                        <div>
                            {data.ProductWeight.map((weight, i) => (
                                <div key={i}>{weight} kg</div>
                            ))}
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
                            <input type="text" value={productValue} maxLength="1" />
                            <div onClick={() => {
                                if (!isNaN(productValue) && productValue !== 5 && productValue < data.Quantity) {
                                    setProductValue(parseInt(productValue) + 1);
                                };
                                if (productValue === data.Quantity) {
                                    alert("Out of stock");
                                };
                                if (productValue === 5) {
                                    alert('Maximum limit is 5');
                                };
                            }}>+</div>
                        </div>
                    </div>
                    <div className='highlights'>
                        <h3>Highlights</h3>
                        <ul>
                            {data.Highlight.map((highlight, i) => (
                                <li key={i}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='productdes'>
                        <div onClick={() => setExpandeddes(!expandeddes)}>
                            <h3>PRODUCT DESCRIPTION</h3>
                            <img src="https://cdn0.iconfinder.com/data/icons/solid-line-essential-ui-icon-set/512/essential_set_down-512.png" alt="img" style={{ transform: expandeddes ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </div>
                        {expandeddes && (
                            <div style={{ height: 'auto', transition: 'height 0.3s, opacity 0.3s, padding 0.3s' }}>
                                {data.description}
                            </div>
                        )}
                    </div>
                    <div className='productsellerdes'>
                        <div onClick={() => setExpandedseldes(!expandedseldes)}>
                            <h3>SUPPLIER INFORMATION</h3>
                            <img src="https://cdn0.iconfinder.com/data/icons/solid-line-essential-ui-icon-set/512/essential_set_down-512.png" alt="img" style={{ transform: expandedseldes ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </div>
                        {expandedseldes && (
                            <div style={{ height: 'auto', transition: 'height 0.3s' }}>
                                {data.SupplierDescription}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div> )}</>
    );
}

export default ProductPage;
