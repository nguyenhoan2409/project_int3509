import React, {useState} from 'react'
import './Navbar.css'

import logo from  '~/Components/Assets/Logo ĐH Quốc Gia Hà Nội-VNU Text.png'
import { Link } from 'react-router-dom';


export const Navbar = () => {

  const [menu, setMenu] = useState("shop");
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
        
      <ul className="nav-menu">
        <li onClick={()=> {setMenu("shop")}}><Link style={{textDecoration: 'none'}} to = '/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("uniform")}}><Link style={{textDecoration: 'none'}} to = '/uniforms'>Uniforms</Link>{menu==="uniform"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("tool")}}><Link style={{textDecoration: 'none'}} to = '/tools'>Tools</Link>{menu==="tool"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("request")}}><Link style={{textDecoration: 'none'}} to = '/request'>Create Request</Link>{menu==="request"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("schedule")}}><Link style={{textDecoration: 'none'}} to = '/schedule'>Schedule</Link>{menu==="schedule"?<hr/>:<></>}</li>
        <li onClick={()=> {setMenu("profile")}}><Link style={{textDecoration: 'none'}} to = '/profile'>Profile</Link>{menu==="profile"?<hr/>:<></>}</li>
      </ul>

      <div className="nav-login-cart">
        <Link to ='/login'><button>Login</button></Link>
      </div>
    </div>
  )
}
