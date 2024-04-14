import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import "./Products.admin.css";
export const ProductsManagement = () => {
  return (
    <div className="products-management-admin">
       <Box
        sx={{
          textAlign: "center",
          p: 2,
          background: (theme) => theme.palette.grey["200"],
          color: (theme) => theme.palette.success.main,
        }}
      >
        <Typography variant="h5">Quản lý sản phẩm</Typography>
      </Box>

      <div className="products-container">
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
