import React from 'react'
import './UserSidebar.css'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { useSelector } from 'react-redux';

export const UserSidebar = ({ activepage }) => {
  const {user} = useSelector((state) => state.auth); 
  return (
    <div className='usersidebar'>

      {
        activepage === 'accountsettings' ?
          <div className='s2'>
            <div className='usersidebar-icon'> <FaRegUserCircle /> </div>
            <span style={{fontSize : "20px", fontWeight : "600"}}>Chỉnh sửa thông tin</span>
          </div>
          :
          <Link to='/user/accountsettings'
            className='stylenone'
          >
            <div className='s1'>
              <div className='usersidebar-icon'> <FaRegUserCircle /> </div>
              <span style={{fontSize : "20px" , fontWeight : "600"}} >Chỉnh sửa thông tin</span>
            </div>
          </Link>

      }

      {
        (user?.role_id === 2) ? ((activepage === 'yourorders') ?
          <div className='s2'>
            <div className='usersidebar-icon'> <IoCartOutline /> </div>

            <span style={{fontSize : "20px", fontWeight : "600"} }>Lịch sử</span>
          </div>
          :
          <Link to='/user/yourorders' className='stylenone'>
            <div className='s1'>
              <div className='usersidebar-icon'> <IoCartOutline /></div>
              <span style={{fontSize : "20px", fontWeight : "600"}}>Lịch sử</span>
            </div>
          </Link>)
          : <></>

      }

      {
        activepage === 'changepassword' ?
          <div className='s2'>
            <div className='usersidebar-icon'> <FaRegEye /> </div>
            <span style={{fontSize : "20px", fontWeight : "600"}}>Đổi mật khẩu</span>
          </div>
          :
          <Link to='/user/changepassword' className='stylenone'>
            <div className='s1'>
              <div className='usersidebar-icon'> <FaRegEye className='usersidebar-icon' /> </div>
              <span style={{fontSize : "20px", fontWeight : "600"}}>Đổi mật khẩu</span>
            </div>
          </Link>

      }


    </div>
  )
}