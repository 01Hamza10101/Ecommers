import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';
import { RegisterUser } from '../../Redux/Userslice.jsx';

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserState = useSelector((state)=> state.User);
  
  useEffect(()=>{
    if(UserState.Token){
      navigate('/');
    }
  },[UserState]);

  const [formdata,setFormdata] = useState({
    FirstName:'',
    LastName:'',
    email:'',
    confirmpassword:'',
    password:'',
  });

  const handleData = (e) => { 
    const { name, value } = e.target;
     setFormdata((prevFormdata) =>
      ({ ...prevFormdata, [name]: value })
      )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formdata.confirmpassword == formdata.password){
      let register = dispatch(RegisterUser({
          FirstName:formdata.FirstName,
          LastName:formdata.LastName,
          EmailAddress:formdata.email,
          Password:formdata.password,
        }));
        // if (register.payload.token) {
        //   navigate('/');
        //   window.location.reload();
        // } else {
        //     console.error('Login failed:', resultAction.payload);
        // }
    };
    if(formdata.confirmpassword !== formdata.password){
      alert("Please enter correct password")
    };
    
  };
  
  return (
    <form onSubmit={handleSubmit}  className="Signup-form">
        <div className='div-1'>
            <img src="https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />
        </div>
        <div className='div-2'>
        <h1>Welcome!</h1>
       <label htmlFor="name">First Name</label>
       <input
        type="text"
        id="FirstName"
        name='FirstName'
        value={formdata.FirstName}
        onChange={(e) => handleData(e)}
       />
       <label htmlFor="name">Last Name</label>
       <input
        type="text"
        id="LastName"
        name='LastName'
        value={formdata.LastName}
        onChange={(e) => handleData(e) }
       />
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        name='email'
        value={formdata.email}
        onChange={(e) => handleData(e) }
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name='password'
        value={formdata.password}
        onChange={(e) => handleData(e)}
      />
      <label htmlFor="confirmpassword">Confirm password</label>
      <input
        type="password"
        id="Conpassword"
        name='confirmpassword'
        value={formdata.confirmpassword}
        onChange={(e) => handleData(e)}
      />
      <button type="submit" className='submitbtn'>SIGN UP</button>
      <a href="/forgot-password" className='forgotBtn'>Forgot password?</a>
      
      <div className='or'><span>or</span></div>
        <button className='signupbtn' onClick={() => navigate('/login')}>SIGN IN</button>

      </div>
    </form>
  );
}

export default SignupForm;