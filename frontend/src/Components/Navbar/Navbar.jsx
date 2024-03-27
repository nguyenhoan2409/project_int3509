import React, { useEffect, useState } from "react";
import "./Navbar.css";

import logo from "~/Components/Assets/Logo ĐH Quốc Gia Hà Nội-VNU Text.png";
import defaultAvatar from "~/Components/Assets/defaultAvatar.png";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLogout, AiFillCaretDown } from "react-icons/ai";
import axios from "axios";

export const Navbar = () => {
  const navigate = useNavigate(); 
  const logout = async () => {
    try {
      await axios.delete('http://localhost:8080/logout', {withCredentials: true}); 
      navigate('/'); 
      alert('Đăng xuất thành công')
    } catch(error) {
      console.log(error); 
    }
  }

  return (
    <div className="navbar-container">
      <div className="nav-logo">
        <img src={logo} alt="" className="logo-img" />
      </div>

      <div className="nav-menu-container">
        <ul className="nav-menu">
          <li>
            <Link to="/home" className="nav-link">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/product" className="nav-link">
              Dụng cụ
            </Link>
          </li>
          <li>
            <Link to="/score" className="nav-link">
              Tra cứu điểm
            </Link>
          </li>
          <li>
            <Link to="/request" className="nav-link">
              Yêu cầu
            </Link>
          </li>
          <li>
            <img src={defaultAvatar} class="img-profile" />
            <AiFillCaretDown color="rgba(186, 149, 149, 0.4)" size={18} style={{paddingBottom: 10}}/>
            <ul className="sub-item-container">
              <li class="sub-item">
                <AiOutlineUser color="black" size={18} style={{marginLeft: 5}}/>
                <Link to="/user/:activepage"> Thông tin cá nhân </Link>
              </li>
              <li class="sub-item" onClick={logout}>
                <AiOutlineLogout color="black" size={18} style={{marginLeft: 5}}/>
                <span> Đăng xuất </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
