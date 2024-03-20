import React, { useState } from 'react'
import './LoginSignup.css'
import axios from 'axios'

export const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const Register = () => {
    axios.post('http://localhost:8080/login', { email, password })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Đăng nhập</h1>
        <div className="loginsignup-fields">
          <input type="email"
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
          <input type="password"
            placeholder='Mật khẩu'
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button onClick={Register}>Tiếp tục</button>
        <p className="loginsignup-login">Bạn chưa có tài khoản? <span>Đăng ký</span></p>
      </div>
    </div>
  )
}
