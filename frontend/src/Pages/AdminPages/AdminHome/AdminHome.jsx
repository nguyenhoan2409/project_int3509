import React, { useEffect, useState } from 'react'
import Layout from '~/Pages/Layout/Layout'
import { useDispatch } from 'react-redux';
import { getMe } from '~/features/authSlice';
import { Container } from "@mui/material";
import { AppView } from "~/sections/overview/view";
import axios from 'axios';

export const AdminHome = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getMe());
  }, []);
  
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <AppView />
      </Container>
    </Layout>
  )
}
