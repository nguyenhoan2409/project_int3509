import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { BsBagCheckFill, BsGrid1X2Fill, BsFileEarmarkTextFill, BsFilePersonFill, BsListCheck } from "react-icons/bs"

export const Sidebar = () => {
  return (
    <div className="sidebar">
      
      
      <div className="bottom">
        <ul>
          <li>
            <Link to={"/admin/dashboard"} style={{ textDecoration: "none" }}>
              <BsGrid1X2Fill className="icon" />
              <span>Dashboard</span>
            </Link>

          </li>

          <li>
            <Link to={"/admin/products/list"} style={{ textDecoration: "none" }}>
              <BsBagCheckFill className="icon" />
              <span>Quản lý sản phẩm</span>
            </Link>
          </li>

          <li>
            <Link to={"/admin/requests"} style={{ textDecoration: "none" }}>
              <BsListCheck className="icon" /> 
              <span>Quản lý yêu cầu</span>
            </Link>
          </li>

          <li>
            <Link to={"/admin/scores"} style={{ textDecoration: "none" }}>
              <BsFileEarmarkTextFill className="icon" /> 
              <span>Quản lý điểm</span>
            </Link>
          </li>

          <li>
            <Link to={"/admin/users"} style={{ textDecoration: "none" }}>
              <BsFilePersonFill className="icon" /> 
              <span>Quản lý người dùng</span>

            </Link>
          </li>

        </ul>
      </div>

    </div>
  );
};
