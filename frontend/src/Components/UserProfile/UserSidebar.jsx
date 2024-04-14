import React from 'react'
import './UserSidebar.css'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";

export const UserSidebar = ({ activepage }) => {
  return (
    <div className='usersidebar'>

      {
        activepage === 'accountsettings' ?
          <div className='s2'>
           <div className='usersidebar-icon'> <FaRegUserCircle/> </div>
            <span>Chỉnh sửa thông tin</span>
          </div>
          :
          <Link to='/user/accountsettings'
            className='stylenone'
          >
            <div className='s1'>
            <div className='usersidebar-icon'> <FaRegUserCircle/> </div>
              <span>Chỉnh sửa thông tin</span>
            </div>
          </Link>

      }

      {
        activepage === 'yourorders' ?
          <div className='s2'>
            <div className='usersidebar-icon'> <IoCartOutline /> </div>

            <span>Lịch sử</span>
          </div>
          :
          <Link to='/user/yourorders' className='stylenone'>
            <div className='s1'>
            <div className='usersidebar-icon'> <IoCartOutline /></div>

              <span>Lịch sử</span>
            </div>
          </Link>

      }

      {
        activepage === 'changepassword' ?
          <div className='s2'>
            <div className='usersidebar-icon'> <FaRegEye /> </div>
            <span>Đổi mật khẩu</span>
          </div>
          :
          <Link to='/user/changepassword' className='stylenone'>
            <div className='s1'>
            <div className='usersidebar-icon'> <FaRegEye className='usersidebar-icon' /> </div>
              <span>Đổi mật khẩu</span>
            </div>
          </Link>

      }


    </div>
  )
}