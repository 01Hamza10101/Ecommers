import React, { useEffect, useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';
import { LoginUser } from '../../Redux/Userslice.jsx';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata,setFormdata] = useState({
    EmailAddress:'',
    Password:''
  });

  const handleData = (e) => { 
    const { name, value } = e.target;
     setFormdata((prevFormdata) =>
      ({ ...prevFormdata, [name]: value })
      )
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(LoginUser(formdata));

    if (resultAction.payload.token) {
      navigate('/');
      window.location.reload();
    } else {
        console.error('Login failed:', resultAction.payload);
    }
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    console.log(windowWidth)
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}  className="login-form">
        <div className='div-1'>
            { windowWidth > 400 && <img src="https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />}
        </div>
        <div className='div-2'>
        <h1>Welcome Back!</h1>
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        name='EmailAddress'
        value={formdata.email}
        onChange={(e) => handleData(e) }
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name='Password'
        value={formdata.password}
        onChange={(e) => handleData(e)}
      />
      <button type="submit" className='submitbtn' >SIGN IN</button>
      <a href="/forgot-password" className='forgotBtn'>Forgot password?</a>
      
      <div className='or'><span>or</span></div>
      <button className='signupbtn' onClick={() => navigate('/signup')}>SIGN UP</button>
      </div>
    </form>
  );
}

export default LoginForm;