import React, {useState} from 'react'
import './Navbar.css'

import logo from  '~/Components/Assets/Logo ĐH Quốc Gia Hà Nội-VNU Text.png'
import { Link } from 'react-router-dom';


export const Navbar = () => {

  const [menu, setMenu] = useState("home");
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
        
      <ul className="nav-menu">
        <li onClick={()=> {setMenu("home")}}><Link style={{textDecoration: 'none'}} to = '/'>Trang chủ</Link>{menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("product")}}><Link style={{textDecoration: 'none'}} to = '/product'>Dụng cụ</Link>{menu==="product"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("score")}}><Link style={{textDecoration: 'none'}} to = '/score'>Điểm</Link>{menu==="score"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("request")}}><Link style={{textDecoration: 'none'}} to = '/request'>Yêu cầu</Link>{menu==="request"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("profile")}}><Link style={{textDecoration: 'none'}} to = '/profile'>Thông tin cá nhân</Link>{menu==="profile"?<hr/>:<></>}</li>
      </ul>

      <div className="nav-login-cart">
        <Link to ='/login'><button>Login</button></Link>
      </div>
    </div>
  )
}
