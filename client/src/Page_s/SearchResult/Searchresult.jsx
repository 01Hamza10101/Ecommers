import React, { useState } from 'react';
import './Searchresult.css';
import star from '../Home/star.png';
import { useDispatch, useSelector } from 'react-redux';
import {GetSearchResult} from '../../Redux/Userslice.jsx';
import { useNavigate } from 'react-router-dom';

const SearchResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SearchResult = useSelector(state => state.User.SearchData)
  const [SearchInput,setSearchInput] = useState("");

  return (
    <>
    <div className='search-result'>
      <h2>{SearchInput && (`${SearchResult.length} RESULTS FOR “${SearchInput}”`)}</h2>
      <div className='serach-card'>
        <div className='serach-inner'>
            <input type="text" value={SearchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => {
              if(e.key === "Enter"){
                if(SearchInput.trim()  !== ""){
                  dispatch(GetSearchResult(SearchInput));
                }
              }}} placeholder='Search'/>
            <button onClick={() => {if(SearchInput.trim()  !== ""){dispatch(GetSearchResult(SearchInput))}}}>
                <img src="https://cdn0.iconfinder.com/data/icons/user-interface-2116/64/3-512.png" alt="Search" />
            </button>
        </div>
      </div>
      <div className="Search-body">
        {SearchResult.map((data,i)=>{
          return (
            <div className="search-product-card" key={i}>
            <img src={data.Image1} alt="img" />
            <h2 onClick={() => navigate(`/product/${data._id}`)}>{data.Title}</h2>
            <h3>₹ {data.CurrentPrice} <span>₹ {data.OldPrice}</span></h3>
            {/* <div className="rating-colletion">
              <img src={star} alt="img" />
              <span className='star-rating'>4.9</span>
              <span>6556</span>
            </div> */}
            </div>
          )
        })}
        
      </div>
    </div>
    {SearchResult.length == 0 && <h4 className='Please-Search'>Please search...</h4> }
    </>
  );
}

export default SearchResult;