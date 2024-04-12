import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserLayout.css";
import { Sidebar } from "~/Components/SideBar/Sidebar";
export const UserLayout = () => {
  return (
    <div className="usersManagement-management-admin">
      <div className="usersManagement-header">
        <div className="usersManagement-tittle"> Quản lý người dùng </div>
      </div>

      <div className="usersManagement-container">
        <div className="usersManagement-right">
          <div className="usersManagement-navbar">
            <Link to="/admin/users/user">
              <button>Danh sách người dùng</button>
            </Link>
            <Link to="/admin/users/admin">
              <button>Danh sách admin</button>
            </Link>
      
          </div>
        </div>
      </div>
    </div>
  );
};
