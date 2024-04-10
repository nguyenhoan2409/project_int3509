import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "~/Components/Navbar/Navbar";
import "./Layout.css"
import { Footer } from "~/Components/Footer/Footer";
import { Sidebar } from "~/Components/SideBar/Sidebar";

const Layout = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
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
        {(userInfo.role_id == 1) && <Sidebar />}
        <div className={(userInfo.role_id == 1) ? 'main-content' : ''}>
            <main>{children}</main>
            {(userInfo.role_id == 1) && <Footer />}
        </div>
      </div>
      {(userInfo.role_id == 2) && <Footer />}
    </React.Fragment>
  );
};

export default Layout; 
