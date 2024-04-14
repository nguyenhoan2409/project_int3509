import React, { useEffect, useState } from "react";
import "./Navbar.css";

import logo from "~/Components/Assets/Logo ĐH Quốc Gia Hà Nội-VNU Text.png";
import defaultAvatar from "~/Components/Assets/defaultAvatar.png";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLogout, AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "~/features/authSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const logout = async () => {
    try {
      dispatch(reset());
      dispatch(LogOut());
      handleOpen();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTabClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          Đăng xuất thành công
        </Alert>
      </Snackbar>
      <div className="nav-logo">
        <img src={logo} alt="" className="logo-img" />
      </div>

      <div className="nav-menu-container">
        <ul className="nav-menu">
          <li>
            <Link
              to="/home"
              className={`nav-link ${scrolled ? "nav-link-scrolled" : ""}`}
              onClick={handleTabClick}
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className={`nav-link ${scrolled ? "nav-link-scrolled" : ""}`}
              onClick={handleTabClick}
            >
              Dụng cụ
            </Link>
          </li>
          <li>
            <Link
              to="/score"
              className={`nav-link ${scrolled ? "nav-link-scrolled" : ""}`}
              onClick={handleTabClick}
            >
              Tra cứu điểm
            </Link>
          </li>
          <li>
            <Link
              to="/request"
              className={`nav-link ${scrolled ? "nav-link-scrolled" : ""}`}
              onClick={handleTabClick}
            >
              Yêu cầu
            </Link>
          </li>
          <li>
            <img src={defaultAvatar} className="img-profile" />
            <AiFillCaretDown
              color={scrolled ? "white" : "rgba(186, 149, 149, 0.4)"}
              size={18}
              style={{ paddingBottom: 10 }}
            />
            <ul className="sub-item-container">
              <li className="sub-item">
                <AiOutlineUser color="black" size={18} style={{ marginLeft: 5 }} />
                <Link to="/user/accountsettings" onClick={handleTabClick}>
                  Thông tin cá nhân
                </Link>
              </li>

              {user?.role_id === 1 ? (
                <li className="sub-item">
                  <AdminPanelSettingsIcon color="black" size={18} style={{ marginLeft: 5 }} />
                  <Link to="/admin/dashboard" onClick={handleTabClick}>
                    Quản trị Admin
                  </Link>
                </li>
              ) : null}

              <li className="sub-item" onClick={logout}>
                <AiOutlineLogout color="black" size={18} style={{ marginLeft: 5 }} />
                <span> Đăng xuất </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
