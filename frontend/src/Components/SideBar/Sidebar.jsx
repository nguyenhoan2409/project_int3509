import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FcHome, FcDocument, FcBusinessman } from "react-icons/fc";


export const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <aside className="menu pl-2 has-shadow">
        <ul className="menu-list">
          <li>
            <Link to={"/admin/dashboard"}>
              <FcHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link to={"/admin/products"}>
              <FcDocument /> Quản lý sản phẩm
            </Link>
          </li>
          <li>
            <Link to={"/admin/requests"}>
              <FcDocument /> Quản lý yêu cầu 
            </Link>
          </li>
          <li>
            <Link to={"/admin/scores"}>
              <FcDocument /> Quản lý điểm 
            </Link>
          </li>
          <li>
            <Link to={"/admin/users"}>
              <FcDocument /> Quản lý người dùng
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};
