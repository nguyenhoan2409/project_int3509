import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import axios from "~/hooks/use-axios";
import { useNavigate } from 'react-router-dom';
import { useJwtExpiration } from '~/hooks/use-jwt-expired';

export const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); 
  const handleJwtExpired = useJwtExpiration(); 
  const { user } = useSelector(
    (state) => state.auth
  )

  const newPasswordChange = (e) => {
    setMsg("")
    setNewPassword(e.target.value)
  }

  const cfPasswordChange = (e) => {
    setMsg("")
     setCfPassword(e.target.value)
  }


  const checkPassword = () => {
    if (newPassword !== cfPassword) {
      setMsg("Mật khẩu mới không khớp"); 
    }
}

  const updatePassword = async () => {
    try {
      await axios.patch(`/user/update/password`, {
        user_id: user?.user_id,
        password: password,
        newPassword: newPassword,
      });
      const result = window.confirm('Đổi mật khẩu thành công. Tiếp tục phiên đăng nhập?');
      if (!result) {
          navigate('/')
      } 
    } catch (error) {
      handleJwtExpired(error); 
      console.error("Error fetching data:", error);
      setMsg("Nhập mật khẩu cũ sai, vui lòng thử lại")
    }
}

  const handleUpdate = () => {
    if(newPassword === cfPassword) {
      updatePassword()
      }
    }
  return (
    <div className="accountsettings">
      <div className='title'>Đổi mật khẩu</div>
      <div className="profile-form-container">
        <div className="form-group">
          <label htmlFor="password">Mật khẩu cũ<span>*</span></label>
          <input required type="password" name='password' value={password} onChange={(e) => {setMsg(""); setPassword(e.target.value)}} className='profile-input'/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu mới<span>*</span></label>
          <input required type="password" name='newPassword' value={newPassword} onChange={newPasswordChange} className='profile-input'/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Nhập lại mật khẩu mới<span>*</span></label>
          <input required type="password" name='cfPassword' value={cfPassword} onChange={cfPasswordChange} onBlur={() => checkPassword()} className='profile-input'/>
        </div>
      </div>

      <p className='msg'>{msg}</p>

      <button className='mainbutton1' onClick={handleUpdate}>Cập nhật</button>
    </div>
  )
}