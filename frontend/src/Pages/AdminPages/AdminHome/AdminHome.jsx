import React, { useEffect } from 'react'
import "./AdminHome.scss"
import { Sidebar } from '~/Components/SideBar/Sidebar'
import { Widget } from '~/Components/Widget/Widget'
import List from '~/Components/List/List'
import Layout from '~/Pages/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '~/features/authSlice';

export const AdminHome = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
    <Layout>
    <div className="home">
        <div className="homeContainer">
           <div className="widget">
              <Widget type="customer" />
              <Widget type="order" />
              <Widget type="earnings" />
              <Widget type="balance" />
           </div>
           
          <div className="listContainer">
            <div className="listTitle">Yêu cầu gần nhất</div>
            <List/>
          </div>
        </div>
    </div>
    </Layout>
  )
}
