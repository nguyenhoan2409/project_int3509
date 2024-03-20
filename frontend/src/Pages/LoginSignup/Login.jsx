import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
export const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const Login = () => {
    axios.post('http://localhost:8080/login', { email, password })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container-left">
        <h2>THÔNG BÁO</h2>
        <p>Hệ thống  đã được nâng cấp vào ngày 04/05/2023.</p>

        <ul>
          <li>Thời gian sử dụng hệ thống mỗi lần đăng nhập sẽ chỉ giới hạn trong 20 phút. </li>
          <li>Hệ thống sẽ tạm dừng để bảo trì định kỳ từ 1h đến muộn nhất là 4h sáng hàng ngày.</li>
          <li>Sau khi ghi nhận đăng ký học thành công hoặc hết thời gian 20 phút sử dụng, hệ thống sẽ tự động đăng xuất tài khoản (dành vị trí cho các bạn khác đăng ký). Khi đăng xuất tài khoản, sinh viên chỉ có thể đăng nhập lại sau 30 phút kể từ lần login cuối cùng. </li>
        </ul>

      </div>
      <div className="loginsignup-container-right">
        <h1>Đăng nhập</h1>
        <div className="loginsignup-fields">
          <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='Mật khẩu' onChange={e => setPassword(e.target.value)} />
        </div>

        <button onClick={Login}>Tiếp tục</button>
        <p className="loginsignup-login">Bạn đã có tài khoản chưa?
          <Link style={{ textDecoration: 'none' }} to='/signup'><span>Đăng ký</span></Link>
        </p>
      </div>
    </div>
  )
}
