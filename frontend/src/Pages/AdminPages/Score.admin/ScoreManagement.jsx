import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '~/features/authSlice';
import { Link } from 'react-router-dom';
export const ScoresManagement = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
      <div>
        Quản lý điểm
        Tìm kiếm 
        List điểm - nút chỉnh sửa
        <Link to = "/admin/scores/update"><button>Chỉnh sửa điểm</button></Link>
        <Link to = "/admin/students/add"><button>Thêm danh sách sinh viên </button></Link>
        <Link to = "/admin/scores/add"><button>Nhập điểm </button></Link>
      </div>

  )
}