import React, { useState , useEffect } from 'react';
import './forgot-password.css'
import { useNavigate } from 'react-router-dom';

const FogotPasswordform = () => {
  const navigate = useNavigate();
  const [isotpvisible,setisotpvisible] = useState('true');
  const [formdata,setFormdata] = useState({
    email:'',
    password:'',
    conformpassword:"",
    otp:""
  })

  const handleData = (e) => { 
    const { name, value } = e.target;
     setFormdata((prevFormdata) =>
      ({ ...prevFormdata, [name]: value })
      )
}

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}  className="forgot-form">
        <div className='div-1'>
            {windowWidth > 400 && <img src="https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />}
        </div>
        <div className='div-2'>
        <h3>Forgot password!</h3>
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        name='email'
        value={formdata.email}
        onChange={(e) => handleData(e) }
      />
     {isotpvisible && (<><label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name='password'
        value={formdata.password}
        onChange={(e) => handleData(e)}
      />
      <label htmlFor="password">Conform Password</label>
      <input
        type="password"
        id="conformpassword"
        name='conformpassword'
        value={formdata.conformpassword}
        onChange={(e) => handleData(e)}
      />
      <label htmlFor="otp">One time password</label>
      <input
        type="text"
        id="otp"
        name='otp'
        value={formdata.otp}
        onChange={(e) => handleData(e)}
      /></>)}
      <button type="submit" className='submitbtn' onClick={() => navigate('/login')}>Send</button>
      <div className='or'><span>or</span></div>
      <button className='signupbtn' onClick={() => navigate('/login')}>Back</button>

      </div>
    </form>
  );
}

export default FogotPasswordform;