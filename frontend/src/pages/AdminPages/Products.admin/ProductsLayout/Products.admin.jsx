import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import "./Products.admin.css";
export const ProductsManagement = () => {
  const navigate = useNavigate(); 
  return (
    <div className="products-management-admin">
      <div className="title">Quản lý sản phẩm</div>

      <div className="products-container">
        <div className="products-right">
          <div className="products-navbar">
            <button onClick={() => navigate("/admin/products/list")} className="products-navbar-btn">
              Danh sách sản phẩm{" "}
            </button>

            <button onClick={() => navigate("/admin/products/add")} className="products-navbar-btn create-product">
              Thêm sản phẩm{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
