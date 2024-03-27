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

  const [user, setUser] = useState({});
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
        if (!confirmPassword) {
          setErrorConfirmPassword("Vui lòng nhập lại mật khẩu");
        } 
        if (password && confirmPassword && password != confirmPassword) {
          setErrorConfirmPassword('Mật khẩu nhập lại không trùng khớp');
        }
        break;
      case "fullname": {
        if (!fullname) {
          setErrorFullName("Vui lòng nhập họ và tên");
        } else {
          setFullname(fullname.replace(/\s+/g, ' ')); 
        }
      }
      break;
      case "phone":
        if (!phone) {
          setErrorPhone("Vui lòng nhập số điện thoại");
        } else {
          if (!(/^(0\d{9}|(\+84|\(84\))\d{9})$/.test(phone))) {
            setErrorPhone("Số điện thoại không hợp lệ, định dạng chuẩn 10 số dạng 0xxxx.. hoặc +84xxxx..")
          }
        }
        break;
      case "address":
        if (!address) {
          setErrorAddress("Vui lòng nhập địa chỉ");
        }
        break;
      default: 
        alert('Type không hợp lệ'); 
    }
  };
  const Register = async (e) => {
    e.preventDefault();
    validate("mssv"); 
    validate("email");
    validate("password");
    validate("fullname");
    validate("phone");
    validate("address");

    try {
      const response = await axios.post('http://localhost:8080/register', {
        user_id: parseInt(mssv), 
        password: password, 
        fullname: fullname, 
        email: email, 
        phone_number: phone, 
        address: address, 
        role_id: 2
      }, {withCredentials: true})
      if (response.data) {
        navigate('/'); 
        console.log('Tạo tài khoản thành công'); 
      }
      return response.data; 
    } catch(err) {
      setMsg(err.response.data.msg); 
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

      <div className="signup-container-right">
        <h1>Đăng ký</h1>
        <form onSubmit={Register} className="signup-fields">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              id="input-with-icon-textfield"
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
            <TextField
              id="input-with-icon-textfield"
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
                validate('email')
              }}
              variant="outlined"
              className="signUpInput"
              sx={{ flex: "50%" }}
              size="small"
              fullWidth
            />
          </div>

          <TextField
            id="input-with-icon-textfield"
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
            id="input-with-icon-textfield"
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
              validate('password'); 
            }}
            variant="outlined"
            className="signUpInput"
            size="small"
            fullWidth
          />

          <TextField
            id="input-with-icon-textfield"
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
              validate('fullname'); 
            }}
            variant="outlined"
            className="signUpInput"
            size="small"
            fullWidth
          />

          <TextField
            id="input-with-icon-textfield"
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
              validate('phone'); 
            }}
            variant="outlined"
            className="signUpInput"
            size="small"
            fullWidth
          />

          <TextField
            id="input-with-icon-textfield"
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
            Đăng nhập
          </Button>
        </form>
        <p className="loginsignup-login">
          Bạn đã có tài khoản?
          <Link style={{ textDecoration: "none" }} to="/">
            <span style={{ color: "blue" }}>Đăng nhập</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
