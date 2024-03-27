import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import backgroundLogin from "../../assets/images/backgroungLogin.png"


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


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
        alert('Type không hợp lệ'); 
    }
  };
  const Login = async (e) => {
    try {
      e.preventDefault(); 
      validate('email'); 
      validate('password'); 
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      setUser(response.data.user);
      if (response.data.user.role_id == 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container-left">
        <h2>THÔNG BÁO</h2>
        <p>Hệ thống đã được nâng cấp vào ngày 04/05/2023.</p>

        <ul>
          <li>
            Thời gian sử dụng hệ thống mỗi lần đăng nhập sẽ chỉ giới hạn trong
            20 phút.{" "}
          </li>
          <li>
            Hệ thống sẽ tạm dừng để bảo trì định kỳ từ 1h đến muộn nhất là 4h
            sáng hàng ngày.
          </li>
          <li>
            Sau khi ghi nhận đăng ký học thành công hoặc hết thời gian 20 phút
            sử dụng, hệ thống sẽ tự động đăng xuất tài khoản (dành vị trí cho
            các bạn khác đăng ký). Khi đăng xuất tài khoản, sinh viên chỉ có thể
            đăng nhập lại sau 30 phút kể từ lần login cuối cùng.{" "}
          </li>
        </ul>
      </div> 
      <div className="loginsignup-container-right">
        <h1>Đăng nhập</h1>
        <form onSubmit={Login} className="loginsignup-fields">
          <TextField
            id="input-with-icon-textfield"
            label="Email"
            // type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdOutlineMail size={24}/>
                </InputAdornment>
              ),
            }}
            error={!!errorEmail}
            helperText={errorEmail}
            onChange={(e) => {
              setEmail(e.target.value); 
              setErrorEmail(''); 
              setMsg(''); 
            }}
            onBlur={() => {
              validate('email'); 
            }}
            variant="outlined"
            className="loginInput"
            size="medium"
            fullWidth
          />
      
          <TextField
            id="input-with-icon-textfield"
            label="Mật khẩu"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiLockPasswordLine  size={24}/>
                </InputAdornment>
              ),
            }}
            error={!!errorPassword}
            helperText={errorPassword}
            onChange={(e) => {
              setPassword(e.target.value); 
              setErrorPassword(''); 
              setMsg(''); 
            }}
            variant="outlined"
            className="loginInput"
            size="medium"
          />
          {!errorEmail && !errorPassword && <p className="erroInfo">{msg}</p>}
          <Button type="submit" variant="outlined" className="loginBtn" size="large">Đăng nhập</Button>
        </form>
        <p className="loginsignup-login">
          Bạn chưa có tài khoản ?
          <Link style={{ textDecoration: "none"}} to="/signup">
            <span style={{color: 'blue'}}>Đăng ký</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
