import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "~/components/Navbar/Navbar";
import "./Layout.css"
import { Footer } from "~/components/Footer/Footer";
import { Sidebar } from "~/components/SideBar/Sidebar";
import { FiMenu } from "react-icons/fi";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  }
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  return (
    <React.Fragment>
      {(user?.role_id == 2) && <Navbar />}
      <div className={(user?.role_id == 1) ? 'main-container' : ''}>
        {(user?.role_id == 1) && <FiMenu className={sidebarOpen ? "menubtn" : "menubtn-sidebar-hidden"} size={28} onClick={() => setSidebarOpen(!sidebarOpen)}/>}
        {(user?.role_id == 1 && sidebarOpen) && <Sidebar/>}
        <div className={(user?.role_id == 1 && sidebarOpen) ? 'main-content' : 'main-content-sidebar-hidden'}>
            <main>{children}</main>
            {(user?.role_id == 1) && <Footer />}
        </div>
      </div>
      {(user?.role_id == 2) && <Footer />}
    </React.Fragment>
  );
};

export default Layout; 
