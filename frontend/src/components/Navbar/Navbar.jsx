import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLogout, AiFillCaretDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "~/features/authSlice";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const Navbar = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const [open, setOpen] = React.useState(false);
  const location = useLocation(); 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const logout = async () => {
    try {
      dispatch(reset()); 
      dispatch(LogOut()); 
      handleOpen(); 
      navigate('/'); 
    } catch(error) {
      console.log(error); 
    }
  }

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTabClick = () => {
    window.scrollTo(0, 0); 
  };

  return (
    <div className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Đăng xuất thành công
        </Alert>
      </Snackbar>
      <div className="nav-logo">
        <img src="https://www.vnu.edu.vn/home/images/logo.png" alt="" className="logo-img" />
      </div>

      <div className="nav-menu-container">
        <ul className="nav-menu">
          <li>
            <hr className={`${location.pathname === '/home' ? 'navbar-active' : 'navbar-inactive'}`}></hr>
            <Link to="/home" className={`nav-link ${scrolled ? 'nav-link-scrolled' : ''}`} onClick={handleTabClick}>
              Thông báo
            </Link>
          </li>
          <li>
            <hr className={`${location.pathname === '/product' ? 'navbar-active' : 'navbar-inactive'}`}></hr>
            <Link to="/product" className={`nav-link ${scrolled ? 'nav-link-scrolled' : ''}`} onClick={handleTabClick}>
              Dụng cụ
            </Link>
          </li>
          <li>
            <hr className={`${location.pathname === '/score' ? 'navbar-active' : 'navbar-inactive'}`}></hr>
            <Link to="/score" className={`nav-link ${scrolled ? 'nav-link-scrolled' : ''}`} onClick={handleTabClick}>
              Tra cứu điểm
            </Link>
          </li>
          <li>
            <hr className={`${location.pathname === '/request' ? 'navbar-active' : 'navbar-inactive'}`}></hr>
            <Link to="/request" className={`nav-link ${scrolled ? 'nav-link-scrolled' : ''}`} onClick={handleTabClick}>
              Yêu cầu
            </Link>
          </li>
          <li>
            <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-1024.png" className="img-profile" />
            <AiFillCaretDown color="rgba(186, 149, 149, 0.4)" size={18} style={{paddingBottom: 10}}/>
            <ul className="sub-item-container">
              <li className="sub-item">
                <AiOutlineUser color="black" size={18} style={{marginLeft: 5}}/>
                <Link to="/user/accountsettings" onClick={handleTabClick}> Thông tin cá nhân </Link>
              </li>
              <li className="sub-item" onClick={logout}>
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