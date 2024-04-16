import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

export const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (user) {
      setUserInfo(user); 
    }
    if (isError) {
      setMsg(message); 
    }
  }, [user, isError])

  const newPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const cfPasswordChange = (e) => {
     setCfPassword(e.target.value)
     checkPassword()
  }


  const checkPassword = () => {
    console.log(newPassword, cfPassword)
    if (newPassword === cfPassword) {
      setMsg("Mật khẩu khớp")
  } else {
     setMsg("Mật khẩu không khớp")
  }
}

  const updatePassword = async () => {
    try {
      await axios.patch(`http://localhost:8080/user/update/password`, {
        user_id: userInfo.user_id,
        password: password,
        newPassword: newPassword,
      },
      { withCredentials: true }
      );
      setMsg("Thay đổi mật khẩu thành công")
    } catch (error) {
      console.error("Error fetching data:", error);
      setMsg("Nhập mật khẩu sai, vui lòng thử lại")
    }
}

  const handleUpdate = () => {
    if(newPassword === cfPassword) {
      updatePassword()
    }
  }


  return (
    <div className="accountsettings">
      <h1>Đổi mật khẩu</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="password">Mật khẩu cũ<span>*</span></label>
          <input type="password" name='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu mới<span>*</span></label>
          <input type="password" name='newPassword' onChange={newPasswordChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Nhập lại mật khẩu<span>*</span></label>
          <input type="password" name='cfPassword' onChange={cfPasswordChange}/>
        </div>
      </div>

      <p className='msg'>{msg}</p>

      <button className='mainbutton1' onClick={handleUpdate}>Cập nhật</button>
    </div>
  )
}