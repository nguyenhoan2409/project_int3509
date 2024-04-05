import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '~/features/authSlice';
import { Link } from 'react-router-dom';
export const ProductsManagement = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
      <div>
        Quản lý sản phẩm
        <Link to = "/admin/products/update"><button>Chỉnh sửa sản phẩm </button></Link>
        <Link to = "/admin/products/create"><button>Thêm sản phẩm </button></Link>
      </div>

  )
}