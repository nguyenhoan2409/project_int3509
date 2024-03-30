import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '~/features/authSlice';


export const DashBoard = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
    <Layout>
      <div>
        Dashboard
      </div>
    </Layout>
  )
}