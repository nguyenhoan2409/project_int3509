import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

export const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (user) {
      setUserInfo(user); 
      //setPassword(user.password);
    }
    if (isError) {
      setMsg(message); 
    }
  }, [user, isError])

  const checkPassword = () => {
    if (newPassword !== cfPassword) {
      setMsg("Mật khẩu không khớp")
  } else {
     setMsg("Mật khẩu khớp")
  }
}

  const updatePassword = async () => {
    try {
      console.log(newPassword)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}

  const handleUpdate = () => {
    checkPassword()
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
          <input type="password" name='password' value={password}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu mới<span>*</span></label>
          <input type="password" name='newPassword' onChange={(e) => setNewPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Nhập lại mật khẩu<span>*</span></label>
          <input type="password" name='cfPassword' onChange={(e) => setCfPassword(e.target.value)}/>
        </div>
      </div>

      <p className='msg'>{msg}</p>

      <button className='mainbutton1' onClick={handleUpdate}>Cập nhật</button>
    </div>
  )
}