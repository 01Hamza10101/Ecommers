import React, { useEffect, useState } from 'react';
import './profile.css';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {UpdateProfile} from "../../Redux/Userslice.jsx";
import { useNavigate } from 'react-router-dom';
const ProfileForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const Token = localStorage.getItem('token');
  const user = useSelector((state)=> state.User.User);
  const Address = useSelector((state)=> state.User.Address);
  const navigate = useNavigate();
  const [formData,setformData] = useState("");
  const [IsformEdit,setIsformEdit] = useState(false);

  const [formAddress,setformAddress] = useState({
    Name:'',
    MobileNumber:'',
    PinCode:'',
    Locality:'',
    Address:'',
    City:'',
    State:'',
    Landmark:'',
    MobileNumberOpt:''
  });

  useEffect(()=>{
    if(user && !formData){
      setformData(user);
      setformAddress(Address);
    };
    if(!Token){
      const currentUrl = location.pathname;
      alert('Please Login');
      navigate("/login");      
    };
  },[Token,user]);

  const handleData = (e) => { 
    const { name, value } = e.target;
    setformData((prevFormdata) =>
      ({ ...prevFormdata, [name]: value })
  )
};

const handleAddressData = (e) => { 
  const { name, value } = e.target;
  setformAddress((prevFormdata) =>
    ({ ...prevFormdata, [name]: value })
)
  setIsformEdit(true);
};

const handlerGender = (selectedGender) =>{
  setformData((prevFormData) => ({
    ...prevFormData,
    Gender: selectedGender
  }));
  setIsformEdit(true);
}

function Submit(){
  dispatch(UpdateProfile({formData,formAddress}));
  console.log(formData,formAddress);
}

  return (
    <>
    <div className='Profile'>
        <div className='Profile-Form'>
           <h3>Personal Information</h3>
           <div className='Name-input'>
             <div><input type="text" value={formData.FirstName || ''} name='FirstName' onChange={(e)=> handleData(e)} /></div>
             <div><input type="text" value={formData.LastName || ''}  name='LastName' onChange={(e)=> handleData(e)} /></div>
           </div>
           <h3>Your Gender</h3>
           <div className='Radio-Male'>
              <span>Male</span>
              <input type="radio" checked={formData.Gender == "Male" ? true : false } onChange={(e)=> handlerGender('Male')} />
            </div>
            <div className='Radio-Female'>
              <span>Female</span>
              <input type="radio" checked={formData.Gender == "Female" ? true : false} onChange={(e)=> handlerGender('Female')}/>
           </div>
           <h3>Email Address</h3>
           <div>
            <input type="text" value={formData.EmailAddress || ''} name='EmailAddress'  onChange={(e)=> handleData(e)} />
           </div>
           <h3>Mobile Number</h3>
           <div>
            <input type="text" value={formData.MobileNumber || ''} name='MobileNumber' onChange={(e)=> handleData(e)} />
           </div>
           <div>
            <h4>FAQs</h4>
            <p>
              What happens when I update my email address (or mobile number)?
              Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).

              When will my Flipkart account be updated with the new email address (or mobile number)?
              It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.

              What happens to my existing Flipkart account when I update my email address (or mobile number)?
              Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.

              Does my Seller account get affected when I update my email address?
              Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
           </div>
        </div>
        <div className='Profile-address'>
            <div>Edit Address</div>
            <div>
              <input type="text" value={formAddress.Name} placeholder='Name' name='Name'  onChange={(e)=> handleAddressData(e)} />
              <input type="text" value={formAddress.MobileNumber} placeholder='10-digit mobile number' name='MobileNumber'  onChange={(e)=> handleAddressData(e)}/>
            </div>
            <div>
              <input type="text" value={formAddress.PinCode} placeholder='Pincode' name='PinCode' onChange={(e)=> handleAddressData(e)}/>
              <input type="text" value={formAddress.Locality} placeholder='Locality' name='Locality' onChange={(e)=> handleAddressData(e)}/>
            </div>
            <div>
              <input type="text" value={formAddress.Address} placeholder='Address' name='Address' onChange={(e)=> handleAddressData(e)}/>
            </div>
            <div>
              <input type="text" value={formAddress.City} placeholder='City' name='City' onChange={(e)=> handleAddressData(e)}/>
              <input type="text" value={formAddress.State} placeholder='State' name='State' onChange={(e)=> handleAddressData(e)}/>
            </div>
            <div>
              <input type="text" value={formAddress.Landmark} placeholder='Landmark (Optional)' name='Landmark'  onChange={(e)=> handleAddressData(e)}/>
              <input type="text" value={formAddress.MobileNumberOpt} placeholder='Alternate Phone (Optional)' name='MobileNumberOpt' onChange={(e)=> handleAddressData(e)}/>
            </div>
            {IsformEdit && (<button onClick={Submit}>Update</button>)}
            
            {/* <button>Cancel</button> */}
        </div>
    </div>
    </>
  );
}

export default ProfileForm;