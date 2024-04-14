import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "~/Components/Navbar/Navbar";
import "./Layout.css"
import { Footer } from "~/Components/Footer/Footer";
import { Sidebar } from "~/Components/SideBar/Sidebar";
import { FiMenu } from "react-icons/fi";

const Layout = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  }
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
    if (isError) {
      setMsg(message);
    }
  }, [user, isError]);
  return (
    <React.Fragment>
      {(userInfo.role_id == 2) && <Navbar />}
      <div className={(userInfo.role_id == 1) ? 'main-container' : ''}>
        <FiMenu className={sidebarOpen ? "menubtn" : "menubtn-sidebar-hidden"} size={28} onClick={() => setSidebarOpen(!sidebarOpen)}/>
        {(userInfo.role_id == 1 && sidebarOpen) && <Sidebar/>}
        <div className={(userInfo.role_id == 1 && sidebarOpen) ? 'main-content' : 'main-content-sidebar-hidden'}>
            <main>{children}</main>
            {(userInfo.role_id == 1) && <Footer />}
        </div>
      </div>
      {(userInfo.role_id == 2) && <Footer />}
    </React.Fragment>
  );
};

export default Layout; 
