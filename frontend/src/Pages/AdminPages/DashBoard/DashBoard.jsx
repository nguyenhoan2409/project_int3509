import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
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