import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.admin.css";
import { FaHome } from "react-icons/fa";
import { Sidebar } from "~/Components/SideBar/Sidebar";
export const ProductsManagement = ({ sideBarClick, handleClick }) => {
  return (
    <div className="products-management-admin">
      <div className="products-header">
        <div className="products-tittle"> Quản lý sản phẩm </div>
      </div>

      <div className="products-container">
        <div className="scores-left">{sideBarClick ? <Sidebar /> : null}</div>
        <div className="products-right">
          <div className="products-navbar">
            <Link to="/admin/products/list">
              <button>Danh sách sản phẩm </button>
            </Link>
            <Link to="/admin/products/add">
              <button>Thêm sản phẩm </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
