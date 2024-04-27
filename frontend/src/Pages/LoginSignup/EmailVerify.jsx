import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import "./Login.css"

export const EmailVerify = () => {
  const [valid, setValid] = useState(true);
  const param = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${param.id}/verify/${param.code}`,
          { withCredentials: true }
        );
        setValid(true);
      } catch (error) {
        console.log(error);
        setValid(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      {valid ? (
        <div className="emailVerifyContainer">
          <FaCheckCircle size={80} color="green"/>
          <h1>Xác thực email thành công</h1>
          <Button
            variant="contained"
            size="medium"
            sx={{ textTransform: "none", m: "8px" }}
            onClick={() => {navigate('/')}}
            color="success"
          >Đăng nhập</Button>
        </div>
      ) : (
        <div className="emailVerifyContainer">
          <MdError size={80} color="red"/>
          <h1>Xác thực email không thành công, vui lòng kiểm tra lại link xác thực.</h1>
          <Button
            variant="contained"
            size="medium"
            sx={{ textTransform: "none", m: "8px" }}
            onClick={() => {navigate('/')}}
            color="success"
          >Quay về trang Đăng nhập</Button>
        </div>
      )}
    </>
  );
};
