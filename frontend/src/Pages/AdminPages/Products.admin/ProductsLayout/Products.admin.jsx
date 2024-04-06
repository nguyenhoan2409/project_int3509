import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '~/features/authSlice';
import { Link } from 'react-router-dom';
import "./Products.admin.css"
import { Sidebar } from '~/Components/SideBar/Sidebar';
export const ProductsManagement = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
    <div className='products-container'>
      <div className="products-left">
        <Sidebar/>
      </div>
      <div className="products-right">
        <div className="products-tittle"> Quản lý sản phẩm </div>
        <div className="products-navbar">
          <Link to="/admin/products/list"><button>Danh sách sản phẩm </button></Link>
          <Link to="/admin/products/add"><button>Thêm sản phẩm </button></Link>
        </div>
        <div className="line"></div>
      </div>
    </div>

  )
}