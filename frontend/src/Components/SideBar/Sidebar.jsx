import "./Sidebar.css";
import { FcHome, FcDocument, FcBusinessman } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import logo from "~/Components/Assets/Logo ĐH Quốc Gia Hà Nội-VNU Text.png";
import defaultAvatar from "~/Components/Assets/defaultAvatar.png";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiFillCaretDown,
} from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "~/features/authSlice";
import { FcStatistics } from "react-icons/fc";
import { LiaProductHunt } from "react-icons/lia";
import { GoGitPullRequest } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import {
  BsBagCheckFill,
  BsGrid1X2Fill,
  BsFileEarmarkTextFill,
  BsFilePersonFill,
  BsListCheck,
} from "react-icons/bs";

export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      dispatch(reset());
      dispatch(LogOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [userName, setUserName] = useState("");
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (user) {
      var arr = user.fullname.split(" ");
      setUserName(arr[arr.length - 1]);
    }
    if (isError) {
      setMsg(message);
    }
  }, [user, isError]);

  return (
    <div className="sidebar-container">
      <div>
        <img src={logo} alt="" className="sidebar-logo-img" />
      </div>
      <div className="menu-list-container">
        <ul className="menu-list">
          <li className="menu-list-item">
            <Link to={"/admin/dashboard"}>
              <div className="menu-list-item-container">
                <FcStatistics className="menu-list-icon" size={24} />
                <div>Trang chủ</div>
              </div>
            </Link>
          </li>
          <li className="menu-list-item">
            <Link to={"/admin/products/list"}>
              <div className="menu-list-item-container">
                <BsBagCheckFill className="menu-list-icon" size={24} />
                <div>Quản lý sản phẩm</div>
              </div>
            </Link>
          </li>

          <li className="menu-list-item">
            <Link to={"/admin/request"}>
              <div className="menu-list-item-container">
                <BsListCheck className="menu-list-icon" size={24} />
                <div>Quản lý yêu cầu</div>
              </div>
            </Link>
          </li>

          <li className="menu-list-item">
            <Link to={"/admin/scores/list"}>
              <div className="menu-list-item-container">
                <BsFileEarmarkTextFill className="menu-list-icon" size={24} />
                <div>Quản lý điểm</div>
              </div>
            </Link>
          </li>

          <li className="menu-list-item">
            <Link to={"/admin/users"}>
              <div className="menu-list-item-container">
                <BsFilePersonFill className="menu-list-icon" size={24} />
                <div>Quản lý người dùng</div>
              </div>
            </Link>
          </li>

          <li className="menu-list-item-profile-container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={defaultAvatar} className="img-profile" />
              <p style={{ color: "black", marginLeft: "5px", fontWeight: 600 }}>
                Xin chào, {userName}
              </p>
            </div>
            <ul>
              <li className="sub-item-sidebar">
                <AiOutlineUser
                  color="black"
                  size={18}
                  style={{ marginLeft: 5 }}
                />
                <Link to="/user/:activepage"> Thông tin cá nhân </Link>
              </li>
              <li className="sub-item-sidebar" onClick={logout}>
                <AiOutlineLogout
                  color="black"
                  size={18}
                  style={{ marginLeft: 5 }}
                />
                <span> Đăng xuất </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
