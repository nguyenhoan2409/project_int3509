import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import logoLogin from "../../Components/Assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "~/features/authSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const dispatch= useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const validate = (type) => {
    switch (type) {
      case "email":
        if (!email) {
          setErrorEmail("Vui lòng nhập email.");
        } else {
          if (!email.includes("@")) {
            setErrorEmail("Định dạng email cần có @");
          } else {
            const [, afterAt] = email.split("@");
            if (!afterAt || !afterAt.trim()) {
              setErrorEmail("Cần viết thêm sau @");
            }

            const [domain, extension] = afterAt.split(".");
            if (!domain || !extension) {
              setErrorEmail("Cần viết thêm sau @");
            }
          }
        }
        break;
      case "password":
        if (!password) {
          setErrorPassword("Vui lòng nhập mật khẩu.");
        }
        break;
      default:
        alert("Type không hợp lệ");
    }
  };

  useEffect(() => {
  
    if (user || isSuccess) {
      if (user.role_id == 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    }
    if (isError) {
      setMsg(message); 
    }
    dispatch(reset());
  }, [user, isSuccess, isError, dispatch, navigate]);

  const Login = async (e) => {
      e.preventDefault();
      validate("email");
      validate("password");
      if (email && password && !errorEmail) {
        dispatch(
          LoginUser({
            email: email,
            password: password,
          })
        );
      }
      
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container-left">
        <img src={logoLogin} alt="logo" />
      </div>
      <div className="loginsignup-container-right">
        <h1>Đăng nhập</h1>
        <form onSubmit={Login} className="loginsignup-fields">
          <TextField
          
            label="Email"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdOutlineMail size={24} />
                </InputAdornment>
              ),
            }}
            error={!!errorEmail}
            helperText={errorEmail}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorEmail("");
              setMsg("");
            }}
            onBlur={() => {
              validate("email");
            }}
            variant="outlined"
            className="loginInput"
            size="medium"
            fullWidth
          />

          <TextField
          
            label="Mật khẩu"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiLockPasswordLine size={24} />
                </InputAdornment>
              ),
            }}
            error={!!errorPassword}
            helperText={errorPassword}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorPassword("");
              setMsg("");
            }}
            variant="outlined"
            className="loginInput"
            size="medium"
          />
          {!errorEmail && !errorPassword && <p className="erroInfo">{msg}</p>}
          <Button
            type="submit"
            variant="outlined"
            className="loginBtn"
            size="large"
          >
            {isLoading ? 'Đang kiểm tra...' : 'Đăng nhập'}
          </Button>
        </form>
        <p className="loginsignup-login" onClick={() => {navigate('/notificationLoginSignup', {state: {type: 'forgotPassword-typeEmail'}})}}>Quên mật khẩu?</p>
        <p style={{fontSize: '16px', fontWeight: '500'}}>
          Bạn chưa có tài khoản?
          <Link style={{ textDecoration: "none" }} to="/signup">
            <span style={{ color: "blue", marginLeft: '5px' }}>Đăng ký</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
