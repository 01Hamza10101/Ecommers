import React, { useState } from 'react';
import './profile.css';

const ProfileForm = () => {

  return (
    <>
    <div>
        <div className='Profile-Form'>
           <h3>Personal Information</h3>
           <div className='Name-input'>
             <div><input type="text" /></div>
             <div><input type="text" /></div>
           </div>
           <h3>Your Gender</h3>
           <div>
            <div>
              <input type="radio" />
              <span>Male</span>
              <input type="radio" />
              <span>Female</span>
            </div>
           </div>
           <h3>Email Address</h3>
           <div>
            <input type="text" />
           </div>
           <h3>Mobile Number</h3>
           <div>
            <input type="text" />
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
            <div>EDIT ADDRESS</div>
            <div>
              <input type="text" placeholder='Name' />
              <input type="text" placeholder='10-digit mobile number'/>
            </div>
            <div>
              <input type="text" placeholder='Pincode'/>
              <input type="text" placeholder='Locality'/>
            </div>
            <div>
              <input type="text" placeholder='Address'/>
            </div>
            <div>
              <input type="text" placeholder='City'/>
              <input type="text" placeholder='State'/>
            </div>
            <div>
              <input type="text" placeholder='Landmark (Optional)'/>
              <input type="text" placeholder='Alternate Phone (Optional)'/>
            </div>
            <h5>Address Type</h5>
            <div>
              <input type="radio" />
              <span>Male</span>
              <input type="radio" />
              <span>Female</span>
            </div>
            <button>Save</button>
            <button>Cancel</button>
        </div>
    </div>
    </>
  );
}

export default ProfileForm;