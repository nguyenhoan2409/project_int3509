import React, { useEffect, useState, useMemo } from "react";
import "./Notification.css";
import { useDispatch} from "react-redux";
import { getMe } from "~/features/authSlice";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import Modal from 'react-modal';
import moment from 'moment/moment';
import { CiEdit } from "react-icons/ci";
import { el } from "@faker-js/faker";

export const NotificationPage = () => {
  const dispatch = useDispatch();
  const [notificationList, setNotificationList] = useState([]);
  const [notificationDetail, setNotificationDetail] = useState([]);
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [tittle, setTittle] = useState("");
  const [content, setContent] = useState("");
  const [newTittle, setNewTittle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [id, setId] = useState("");
  const [createTime, setCreateTime] = useState("");
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

const handleOpen = async (notification) => {
  setOpen(true)
  setNotificationDetail(notification)
}

const handleClose = async () => {
   setOpen(false)  
}

const handleOpenEdit = async (notification) => {
  setOpenEdit(true)
  setNewContent(notification.content)
  setNewTittle(notification.tittle)
  setId(notification.notification_id)
  setCreateTime(notification.create_time)
}

const handleCloseEdit = async () => {
   setOpenEdit(false)  
}

const handleInputTittle = (event) => {
        setTittle(event.target.value);
}

const handleInputContent = (event) => {
        setContent(event.target.value);
}
const createNotification = async (e) => {
  try {
  e.preventDefault(); 
   if(tittle.length > 0  && content.length > 0) {
    const response = await axios.post("http://localhost:8080/admin/notification/create", {
      tittle: tittle,
      content: content,
      url: "https://www.vnu.edu.vn/upload/2010/08/79/image/TT%20Giao%20duc%20The%20chat%20&%20The%20thao.jpg",
      create_time : moment().locale('vi').format('YYYY-MM-DD'),
    }, { withCredentials: true });
    getNotification();
    alert("Tạo thông báo thành công!")
    setTittle("")
    setContent("")
  } else {
    alert("Vui lòng điền đầy đủ thông tin")
  }
  } catch (error) {
    alert("Tạo thông báo thất bại, vui lòng thử lại")
    console.error("Error fetching data:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
    }
}
}
const handleTittleChange = (event) => {
  setNewTittle(event.target.value);
}

const handleContentChange = (event) => {
  setNewContent(event.target.value);
}
const updateNotification = async (id) => {
  try {
    const response = await axios.put("http://localhost:8080/admin/notification/update", {
      notification_id: id,
      tittle: newTittle,
      content: newContent,
    },{
      withCredentials: true,
    })
    alert("Cập nhật thành công")
    setOpenEdit(false)
    getNotification();
  } catch (error) {
    alert("Cập nhật thất bại")
    console.error("Error fetching data:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
    }
  }
}

const handleUpdate = (id) => {
  console.log(id)
  if(newTittle.length > 0 && newContent.length > 0) {
    updateNotification(id)
  } else {
    alert("Vui lòng điền đầy đủ thông tin")
  }
}

  return (
    <div className="hero-admin">
      <Layout>
        <div className="hero-main-admin">
          <div className="title">
            Quản lý thông báo
          </div>
        <div className="create-notification-admin" >
          <div className="notification-tittle">Tạo thông báo</div>
          <div className="create-notification-form">
                <input className="create-noti-header" placeholder="Tiêu đề" onChange={handleInputTittle} value={tittle}/>
                <textarea className="create-noti-content" placeholder="Nội dung" onChange={handleInputContent} value={content}/>
                <button className="create-notification-btn-admin" onClick={createNotification}>Đăng tải</button>
          </div>
        </div>

         <div className="notification-tittle"> Danh sách thông báo </div>
          <div className="notification-container-admin"> 
            {notificationList?.map((notification) => (
                <div className="notification-admin">
                      <img src={notification.url} alt="" className="notification-img-admin"/>
                <div className="notification-right-admin">
                      <div style={{display: "flex", justifyContent: "space-between", marginRight: "10px", marginTop: "10px"}}> 
                      <div className="notification-title-admin">{notification.tittle}</div>
                      <CiEdit style={{fontSize: "25px", color: "blue", cursor: "pointer"}} onClick={() => handleOpenEdit(notification)}/>
                        </div>
                      <div className="notification-content-admin">
                        {notification.content.length > 150 ? notification.content.slice(0, 150) + "..." : notification.content} 
                        <div className="notification-time-admin"> Ngày đăng : {notification.create_time}</div>
                        </div>
                    
                      <button className="notification-btn-admin" onClick={() => handleOpen(notification)}> Chi tiết </button>
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
        <div className="notification-header-admin" >
                <h2>Chi tiết thông báo</h2> 
                 <p className="notification-close-admin" onClick={handleClose}>X </p>
          </div>
        <div className="create-noti-header" >{notificationDetail.tittle}</div>
        <div style = {{marginTop: "10px"}}>{notificationDetail.content}</div>
        <div className="notification-time-admin"> Ngày đăng : {notificationDetail.create_time}</div>
      </Modal>
      }

        {openEdit === true 
              &&
              <Modal
            isOpen={openEdit}
            onRequestClose={handleCloseEdit}
            contentLabel="Chỉnh sửa thông báo"
            style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            boxShadow: "2px black",
            p: 4,
          },
        }}
      >
        <div className="notification-header-admin" >
                <h2>Chỉnh sửa thông báo</h2> 
                 <p className="notification-close-admin" onClick={handleCloseEdit}> X </p>
        </div>
        <div className="update-notification-form">
        <input className="create-noti-header"  value={newTittle} onChange={handleTittleChange} />
        <textarea className ="create-noti-content" value={newContent} onChange={handleContentChange} />
          </div>
        <div className="notification-time-admin"> Ngày đăng : {createTime}</div>
        <button className="notification-btn-admin" onClick={() => handleUpdate(id)}> Cập nhật </button>
      </Modal>
      }
          </div>
        </div>
      </Layout>
    </div>
  );
};
