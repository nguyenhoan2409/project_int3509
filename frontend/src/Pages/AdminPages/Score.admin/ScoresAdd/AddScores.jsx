import React, { useEffect, useState } from 'react'
<<<<<<< HEAD:frontend/src/Pages/AdminPages/DashBoard/DashBoard.jsx
import Layout from '../../Layout/Layout'
=======
>>>>>>> origin/trang20020483:frontend/src/Pages/AdminPages/Score.admin/ScoresAdd/AddScores.jsx
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '~/features/authSlice';
import { Link } from 'react-router-dom';

export const AddScores = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
      <div>
        Nhập điểm
      </div>

  )
}