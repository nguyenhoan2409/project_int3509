import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./ScoreLayout.css"
import { FaHome } from "react-icons/fa";
import { Sidebar } from '~/Components/SideBar/Sidebar';
export const ScoresManagement = () => {
  const [sideBarClick, setSideBarClick] = useState(false);
  const handleClick = () => {
    setSideBarClick(!sideBarClick);
  }
  return (
    <div className='scores-management'>
       <div className="scores-header">
       <div className='icon' onClick={handleClick}><FaHome /></div>
      <div className="scores-tittle"> Quản lý điểm </div>
       </div>
      <div className='scores-container'>
        <div className="scores-left">
          {sideBarClick ? <Sidebar /> : null}
        </div>
        <div className="scores-right">
          <div className="scores-navbar">
            <Link to="/admin/scores/list"><button>Danh sách</button></Link>
            <Link to="/admin/students/add"><button>Thêm sinh viên </button></Link>
            <Link to="/admin/scores/add"><button>Nhập điểm </button></Link>
          </div>
        </div>
      </div>
    </div>

  )
}