import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '~/features/authSlice';
import { Link } from 'react-router-dom';

export const UpdateProduct = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
      <div>
        Chỉnh sửa sản phẩm
      </div>

  )
}