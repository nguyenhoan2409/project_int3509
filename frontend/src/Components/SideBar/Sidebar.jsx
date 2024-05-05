import "./Sidebar.css";
import React from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineLogout
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "~/features/authSlice";
import { FcStatistics } from "react-icons/fc";
import { useSelector } from "react-redux";
import {
  BsBagCheckFill,
  BsFileEarmarkTextFill,
  BsFilePersonFill,
  BsListCheck,
} from "react-icons/bs";

export const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); 
  const logout = async () => {
    try {
      dispatch(reset());
      dispatch(LogOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  
  return (
    <div className="sidebar-container">
      <div>
        <img src="https://www.vnu.edu.vn/home/images/logo.png" alt="" className="sidebar-logo-img" />
      </div>
      <div className="menu-list-container">
        <ul className="menu-list">
          <li className={`menu-list-item ${location.pathname === '/admin/dashboard' ? 'sidebar-active' : ''}`}>
            <Link to={"/admin/dashboard"}>
              <div className="menu-list-item-container">
                <FcStatistics className="menu-list-icon" size={24} />
                <div>Trang chủ</div>
              </div>
            </Link>
          </li>
          <li className={`menu-list-item ${location.pathname === '/admin/products/list' || location.pathname === '/admin/products/add' ? 'sidebar-active' : ''}`}>
            <Link to={"/admin/products/list"}>
              <div className="menu-list-item-container">
                <BsBagCheckFill className="menu-list-icon" size={24} />
                <div>Quản lý sản phẩm</div>
              </div>
            </Link>
          </li>

          <li className={`menu-list-item ${location.pathname === '/admin/request' ? 'sidebar-active' : ''}`}>
            <Link to={"/admin/request"} onClick={() => window.scrollTo(0, 0)}>
              <div className="menu-list-item-container">
                <BsListCheck className="menu-list-icon" size={24} />
                <div>Quản lý yêu cầu</div>
              </div>
            </Link>
          </li>

          <li className={`menu-list-item ${location.pathname === '/admin/scores/list' || location.pathname === '/admin/scores/add' ? 'sidebar-active' : ''}`}>
            <Link to={"/admin/scores/list"}>
              <div className="menu-list-item-container">
                <BsFileEarmarkTextFill className="menu-list-icon" size={24} />
                <div>Quản lý điểm</div>
              </div>
            </Link>
          </li>

          <li className={`menu-list-item ${location.pathname === '/admin/users/list' ? 'sidebar-active' : ''}`}>
            <Link to={"/admin/users/list"}>
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
              <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-1024.png" className="img-profile" />
              <p style={{ color: "black", marginLeft: "5px", fontWeight: 600 }}>
                Xin chào, {(user?.fullname.split(" "))[user?.fullname.split(" ").length -1]}
              </p>
            </div>
            <ul>
              <li className="sub-item-sidebar" onClick={() => window.scrollTo(0,0)}>
                <AiOutlineUser
                  color="black"
                  size={18}
                  style={{ marginLeft: 5 }}
                />
                <Link to="/user/accountsettings"> Thông tin cá nhân </Link>
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
