import React from 'react'
import "./AdminHome.scss"
import { Sidebar } from '~/Components/SideBar/Sidebar'
import { Widget } from '~/Components/Widget/Widget'
import List from '~/Components/List/List'
import { NavbarAdmin } from '~/Components/Navbar/NavbarAdmin'

export const AdminHome = () => {
  return (
    <div className="home">
        <NavbarAdmin/>
        <Sidebar/>
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
  )
}
