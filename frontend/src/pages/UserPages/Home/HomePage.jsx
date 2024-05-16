import React, { useEffect, useState} from "react";
import "./HomePage.css";
import { useDispatch} from "react-redux";
import { getMe } from "~/features/authSlice";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import Modal from 'react-modal';
import moment from "moment/moment";

export const HomePage = () => {
  const dispatch = useDispatch();
  const [notificationList, setNotificationList] = useState([]);
  const [notificationDetail, setNotificationDetail] = useState([]);
  const [open, setOpen] = useState(false)
  const [isSeen, setIsSeen] = useState(false)
  useEffect(() => {
    dispatch(getMe());  
    getNotification();
  }, []);

  const getNotification = async () => {
    try {
      const response = await axios.get("http://localhost:8080/home/notification", {
        withCredentials: true,
      });
      setNotificationList([]);
      const response2 = response.data;
      response2.map((notice, index) => {
        notice.create_time = moment
          .utc(notice.create_time)
          .format("DD-MM-YYYY, HH:mm:ss");
      });
      for(let i = response2.length - 1; i >= 0; i--) {
        setNotificationList((notificationList) => [...notificationList, response2[i]]);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
  } 
};

const handleOpen =  (notification) => {
  setOpen(true)
  setNotificationDetail(notification)
}

const handleClose = () => {
   setOpen(false)  
}

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
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div className="notification-title">{notification.tittle}</div>
                      <div style={{color: 'green', fontSize: '20px'}}>...</div>
                        </div>
                      <div className="notification-content">
                        {notification.content.length > 150 ? notification.content.slice(0, 150) + "..." : notification.content} 
                        <div className="notification-time"> Ngày đăng : {notification.create_time}</div>
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
            width: 600,
            boxShadow: "2px black",
            p: 4,
          },
        }}
      >
        <div className="notification-header" >
                <h2>Chi tiết thông báo</h2> 
                 <p className="notification-close" onClick={handleClose}>X </p>
          </div>
        <div>{notificationDetail.tittle}</div>
        <div>{notificationDetail.content}</div>
        <div className="notification-time"> Ngày đăng : {notificationDetail.create_time}</div>
      </Modal>
      }
          </div>
        </div>
      </Layout>
    </div>
  );
};
