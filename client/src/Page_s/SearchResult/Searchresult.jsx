import React, { useState } from 'react';
import './Searchresult.css';
import star from '../Home/star.png';

const SearchResult = () => {

  return (
    <>
    <div className='search-result'>
      <h2>44 RESULTS FOR “PENUT BUTTER”</h2>
      <div className='serach-card'>
        <div className='serach-inner'>
            <input type="text" placeholder='Search'/>
            <button>
                <img src="https://cdn0.iconfinder.com/data/icons/user-interface-2116/64/3-512.png" alt="Search" />
            </button>
        </div>
      </div>
      <div className="Search-body">
        <div className="search-product-card">
            <img src="//myfitness.in/cdn/shop/files/choc_Smooth_b62d0b21-1b20-43d6-a154-8b699a109c45_95x95@2x.jpg?v=1703254525" alt="img" />
            <h2>Chocolate Peanut Butter: Smooth</h2>
            <h3>₹ 300 <span>₹ 200</span></h3>
            <div className="rating-colletion">
              <img src={star} alt="img" />
              <span className='star-rating'>4.9</span>
              <span>6556</span>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SearchResult;