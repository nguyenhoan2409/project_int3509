import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

export const AccountSetting = () => {
  const [userInfo, setUserInfo] = useState({});
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [userId, setUserId] = useState();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [msg, setMsg] = useState(); 
  useEffect(() => {
    if (user) {
      setUserInfo(user); 
      setAddress(user.address);
      setFullname(user.fullname);
      setEmail(user.email);
      setPhoneNumber(user.phone_number);
      setUserId(user.user_id);
    }
    if (isError) {
      setMsg(message); 
    }
  }, [user, isError])

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:8080/user/update`, {
          fullname : fullname,
          email : email,
          phone_number : phone_number,
          address : address,
          user_id: userId
      }, {
        withCredentials: true
      })
      setMsg("Cập nhật thành công")
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }
console.log(userId)
  return (
    <div className="accountsettings">
      <h1>Thông tin người dùng</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="name">Họ và tên<span>*</span></label>
          <input type="text" name='name' id='name' value={fullname} onChange={(e) => setFullname(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại<span>*</span></label>
          <input type="number" name='phone' id='phone' value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email<span>*</span></label>
          <input type="email" name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="text">Địa chỉ<span>*</span></label>
          <input type="text" name='address' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
      
      </div>
      {msg}
      <button className='mainbutton1' onClick={() => updateUser()}>Cập nhật</button>
    </div>
  )
}