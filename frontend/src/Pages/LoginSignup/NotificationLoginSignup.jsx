import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./Login.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";


export const NotificationLoginSignup = () => {
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); 

  const validate = (type) => {
    switch (type) {
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
              setErrorEmail("Email cần có dấu .");
            }
          }
        }
        break;
      default:
        alert("Type không hợp lệ");
    }
  };

  const handleSubmitEmailForForgottenPassword = async (e) => {
    try {
      e.preventDefault();
      validate('email');
      if (email && !errorEmail) {
        const response = await axios.post('http://localhost:8080/user/checkEmailForForgottenPassword', {email: email}, {withCredentials: true}); 
        navigate("/notificationLoginSignup", {state: {type: "aftersignup"}}); 
        if (response) {
          console.log(response?.data); 
        }
      }
    } catch (error) {
      setMsg(error.response?.data?.msg); 
      console.log(error);
    }
  };

  return (
    <>
      {state.type == "aftersignup" && (
        <div className="emailVerifyContainer">
          <FaCheckCircle size={60} color="green" />
          <h2>
            Link xác thực đã được gửi đến email, vui lòng kiểm tra hòm thư và
            click vào link xác thực
          </h2>
        </div>
      )}
      {state.type == "forgotPassword-typeEmail" && (
        <div className="submitEmailForForgottenPassword">
          <h2 style={{ margin: "0 0 10px 10px", textAlign: "center" }}>
            Email
          </h2>
          <form
            onSubmit={handleSubmitEmailForForgottenPassword}
            className="submitEmailForForgottenPasswordFormContainer"
          >
            <TextField
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
              className="loginInput"
              size="large"
              fullWidth
              sx={{mb: 2}}
            />

            {!errorEmail && <p className="erroInfo">{msg}</p>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              color="success"
              fullWidth
              sx={{
                marginTop: "10px",
              }}
            >
              Tiếp tục
            </Button>
          </form>
        </div>
      )}


    </>
  );
};
