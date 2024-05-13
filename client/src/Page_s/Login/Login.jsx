import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formdata,setFormdata] = useState({
    email:'',
    password:''
  })

  const handleData = (e) => { 
    const { name, value } = e.target;
     setFormdata((prevFormdata) =>
      ({ ...prevFormdata, [name]: value })
      )
}

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log(formdata)
  }

  return (
    <form onSubmit={handleSubmit}  className="login-form">
        <div className='div-1'>
            <img src="https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />
        </div>
        <div className='div-2'>
        <h1>Welcome Back!</h1>
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
      <button type="submit" className='submitbtn' onClick={() => navigate('/')}>SIGN IN</button>
      <a href="/forgot-password" className='forgotBtn'>Forgot password?</a>
      
      <div className='or'><span>or</span></div>
      <button className='signupbtn' onClick={() => navigate('/signup')}>SIGN UP</button>
      </div>
    </form>
  );
}

export default LoginForm;