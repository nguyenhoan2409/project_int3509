import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import axios from 'axios';

export const AccountSetting = () => {
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState(''); 
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/getMe`, {withCredentials: true});
        setUser(response.data); 
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserInfo(); 
  }, []); 

  return (
    <div className="accountsettings">
      <h1>Personal Information</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="name">Your Name<span>*</span></label>
          <input type="text" name='name' id='name' value={user.fullname}/>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone/Mobile<span>*</span></label>
          <input type="text" name='phone' id='phone' value={user.phone_number}/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email<span>*</span></label>
          <input type="email" name='email' id='email' value={user.email}/>
        </div>
      
      </div>
      <button className='mainbutton1'>Save Changes</button>
      <p>{msg}</p>
    </div>
  )
}