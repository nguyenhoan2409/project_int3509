import React, { useState } from 'react'
import './LoginSignup.css'
import axios from 'axios'

export const LoginSignup = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const Register = () => {
    axios.post('http://localhost:8080/register', { fullname, email, password})
        .then(res => console.log(res))
        .catch(err => console.log(err))
}
  return (
    <div className="loginsignup">
        <div className="loginsignup-container">
            <h1>Đăng ký</h1>
            <div className="loginsignup-fields">
                <input type="text" placeholder='Họ và tên' value={fullname} onChange={e => setFullname(e.target.value)} />
                <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder='Mật khẩu' onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder='Nhập lại mật khẩu' onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <button>Tiếp tục</button>
            <p className="loginsignup-login">Bạn đã có tài khoản chưa? <span>Đăng nhập</span></p>
        </div>
    </div>
  )
}
