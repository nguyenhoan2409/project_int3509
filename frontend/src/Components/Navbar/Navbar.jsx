import React, { useState } from "react";
import "./Navbar.css";

import logo from "~/Components/Assets/Logo ĐH Quốc Gia Hà Nội-VNU Text.png";
import defaultAvatar from "~/Components/Assets/defaultAvatar.png";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineLogout, AiFillCaretDown } from "react-icons/ai";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="nav-logo">
        <img src={logo} alt="" className="logo-img" />
      </div>

      <div className="nav-menu-container">
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/uniforms" className="nav-link">
              Dụng cụ
            </Link>
          </li>
          <li>
            <Link to="/tools" className="nav-link">
              Điểm
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
                <Link to="/profile"> Thông tin cá nhân </Link>
              </li>
              <li class="sub-item">
                <AiOutlineLogout color="black" size={18} style={{marginLeft: 5}}/>
                <Link to="/login"> Đăng xuất </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
