import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./Login.css"

export const NotificationLoginSignup = () => {
  const {state} = useLocation(); 
  
  return (
    <>
      {(state.type == "aftersignup") && (<div className="emailVerifyContainer">
          <FaCheckCircle size={60} color="green"/>
          <h2>Link xác thực đã được gửi đến email, vui lòng kiểm tra hòm thư và click vào link xác thực</h2>
        </div>)}
    </>
  );
};
