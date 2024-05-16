import React, { useEffect, useState} from "react";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "~/features/authSlice";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const HomePage = () => {
  const dispatch = useDispatch();
  const [notificationList, setNotificationList] = useState([]);
  const [notificationDetail, setNotificationDetail] = useState([]);
  const [open, setOpen] = useState(false)
  useEffect(() => {
    dispatch(getMe());  
    getNotification();
  }, []);

  const getNotification = async () => {
    try {
      const response = await axios.get("http://localhost:8080/home/notification", {
        withCredentials: true,
      });
      const notification = response.data;
      setNotificationList([]);
      for(let i = notification.length - 1; i >= 0; i--) {
        setNotificationList((notificationList) => [...notificationList, notification[i]]);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
  } 
};

const handleOpen = async (notification) => {
  setOpen(true)
  setNotificationDetail(notification)
}
console.log(notificationDetail)
const handleClose = async (notification) => {
   setOpen(false)  
}
console.log(open, notificationDetail)
  return (
    <div className="hero">
      <Layout>
        <div className="hero-main">
          <div className="title">
            Thông báo
          </div>
          <div className="notification-container"> 
            {notificationList?.map((notification) => (
                <div className="notification">
                      <img src={notification.url} alt="" className="notification-img"/>
                <div className="notification-right">
                      <div className="notification-title">{notification.tittle}</div>
                      <div className="notification-content">
                        {notification.content.length > 20 ? notification.content.slice(0, 150) + "..." : notification.content} 
                        </div>
                      <button className="notification-btn" onClick={() => handleOpen(notification)}> Chi tiết </button>
              </div>
              </div>
            ))}
              { open === true 
              &&
              <Modal
            isOpen={open}
            onRequestClose={handleClose}
            contentLabel="Chi tiết thông báo"
            style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: "2px black",
            p: 4,
          },
        }}
      >
        <div className="notification-header" >
                <h2>Chi tiết thông báo</h2> 
                 <p className="notification-close" onClick={handleClose}>X </p>
          </div>
        <div>{notificationDetail.content}</div>
      </Modal>
      }
          </div>
        </div>
      </Layout>
    </div>
  );
};
