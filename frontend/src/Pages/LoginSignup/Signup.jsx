import React, { useState } from "react";
import "./Login.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoNumber } from "react-icons/go";
import { MdDriveFileRenameOutline, MdOutlinePhone } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logoLogin from "../../Components/Assets/logo.svg";

export const Signup = () => {
  const [mssv, setMssv] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [errorMssv, setErrorMssv] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorFullName, setErrorFullName] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const validate = (type) => {
    switch (type) {
      case "mssv":
        if (!mssv) {
          setErrorMssv("Vui lòng nhập mã số sinh viên.");
        }
        break;
      case "email":
        if (!email) {
          setErrorEmail("Vui lòng nhập email");
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
              setErrorEmail("Email cần chứa dấu .");
            }
          }
        }
        break;
      case "password":
        if (!password) {
          setErrorPassword("Vui lòng nhập mật khẩu.");
        }
        if (!confirmPassword) {
          setErrorConfirmPassword("Vui lòng nhập lại mật khẩu");
        }
        if (password && confirmPassword && password != confirmPassword) {
          setErrorConfirmPassword("Mật khẩu nhập lại không trùng khớp");
        }
        break;
      case "fullname":
        {
          if (!fullname) {
            setErrorFullName("Vui lòng nhập họ và tên");
          } else {
            setFullname(fullname.replace(/\s+/g, " "));
          }
        }
        break;
      case "phone":
        if (!phone) {
          setErrorPhone("Vui lòng nhập số điện thoại");
        } else {
          if (!/^(0\d{9}|(\+84|\(84\))\d{9})$/.test(phone)) {
            setErrorPhone(
              "Số điện thoại không hợp lệ, định dạng chuẩn 10 số dạng 0xxxx.. hoặc +84xxxx.."
            );
          }
        }
        break;
      case "address":
        if (!address) {
          setErrorAddress("Vui lòng nhập địa chỉ");
        }
        break;
      default:
        alert("Type không hợp lệ");
    }
  };
  const Register = async (e) => {
    try {
      e.preventDefault(); 
      validate("email");
      validate("password");
      validate("fullname");
      validate("phone");
      validate("address");
      if (email &&
         password &&
         confirmPassword &&
         address &&
         fullname &&
         phone && !errorEmail && !errorConfirmPassword && !errorPhone) {
            const response = await axios.post(
            "http://localhost:8080/register",
            {
              password: password,
              fullname: fullname,
              email: email,
              phone_number: phone,
              address: address,
              role_id: 2,
            },
            { withCredentials: true }
          );
          if (response?.data) {
            console.log(response.data);
            setIsLoading(true);
            navigate("/notificationLoginSignup", {state: {type: "aftersignup"}})
            console.log("Tạo tài khoản thành công");
          }
          return response?.data;
          
         } 
    } catch (err) {
      console.log(err?.response?.data);
      setMsg(err?.response?.data?.msg);
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container-left">
        <img src={logoLogin} alt="logo" />
      </div>

      <div className="signup-container-right">
        <h1>Đăng ký</h1>
        <form onSubmit={Register} className="signup-fields">
          {/* <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              label="Mã số sinh viên"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GoNumber size={24} />
                  </InputAdornment>
                ),
              }}
              error={!!errorMssv}
              helperText={errorMssv}
              onChange={(e) => {
                setMssv(e.target.value);
                setErrorMssv("");
                setMsg("");
              }}
              variant="outlined"
              className="signUpInput"
              sx={{ flex: "50%", marginRight: "10px" }}
              size="small"
              fullWidth
              
            />
            
          </div> */}

          <TextField
              name="email"
              label="Email"
              // type="email"
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
              className="signUpInput"
              sx={{ flex: "50%" }}
              size="small"
              fullWidth
            />

          <TextField
            name="password"
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
            className="signUpInput"
            size="small"
            fullWidth
          />

          <TextField
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiLockPasswordLine size={24} />
                </InputAdornment>
              ),
            }}
            error={!!errorConfirmPassword}
            helperText={errorConfirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrorConfirmPassword("");
              setMsg("");
            }}
            onBlur={() => {
              validate("password");
            }}
            variant="outlined"
            className="signUpInput"
            size="small"
            fullWidth
          />

          <TextField
            name="fullname"
            label="Họ và tên"
            type="text"
            value={fullname}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdDriveFileRenameOutline size={24} />
                </InputAdornment>
              ),
            }}
            error={!!errorFullName}
            helperText={errorFullName}
            onChange={(e) => {
              setFullname(e.target.value);
              setErrorFullName("");
              setMsg("");
            }}
            onBlur={() => {
              validate("fullname");
            }}
            variant="outlined"
            className="signUpInput"
            size="small"
            fullWidth
          />

          <TextField
            name="phonenumber"
            label="Số điện thoại"
            type="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdOutlinePhone size={24} />
                </InputAdornment>
              ),
            }}
            error={!!errorPhone}
            helperText={errorPhone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrorPhone("");
              setMsg("");
            }}
            onBlur={() => {
              validate("phone");
            }}
            variant="outlined"
            className="signUpInput"
            size="small"
            fullWidth
          />

          <TextField
            name="address"
            label="Địa chỉ"
            type="text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaRegAddressCard size={24} />
                </InputAdornment>
              ),
            }}
            error={!!errorAddress}
            helperText={errorAddress}
            onChange={(e) => {
              setAddress(e.target.value);
              setErrorAddress("");
              setMsg("");
            }}
            variant="outlined"
            className="signUpInput"
            size="small"
            fullWidth
          />
          <p className="erroInfo">{msg}</p>
          <Button
            type="submit"
            variant="outlined"
            className="signUpBtn"
            size="large"
          >
            {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
          </Button>
        </form>
        <p style={{fontSize: '16px', fontWeight: '500', marginTop: '10px'}}>
          Bạn đã có tài khoản?
          <Link style={{ textDecoration: "none", marginLeft: '5px' }} to="/">
            <span style={{ color: "blue" }}>Đăng nhập</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
