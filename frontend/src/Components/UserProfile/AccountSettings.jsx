import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

export const AccountSetting = () => {
  const [userInfo, setUserInfo] = useState({});
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [msg, setMsg] = useState(''); 
  useEffect(() => {
    if (user) {
      setUserInfo(user); 
    }
    if (isError) {
      setMsg(message); 
    }
  }, [user, isError])
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/user/getMe`, {withCredentials: true});
  //       setUser(response.data); 
  //     } catch (error) {
  //       if (error.response) {
  //         setMsg(error.response.data.msg);
  //       }
  //     }
  //   };
  //   getUserInfo(); 
  // }, []); 

  return (
    <div className="accountsettings">
      <h1>Personal Information</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="name">Your Name<span>*</span></label>
          <input type="text" name='name' id='name' value={userInfo.fullname}/>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone/Mobile<span>*</span></label>
          <input type="text" name='phone' id='phone' value={userInfo.phone_number}/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email<span>*</span></label>
          <input type="email" name='email' id='email' value={userInfo.email}/>
        </div>
      
      </div>
      <button className='mainbutton1'>Save Changes</button>
      <p>{msg}</p>
    </div>
  )
}