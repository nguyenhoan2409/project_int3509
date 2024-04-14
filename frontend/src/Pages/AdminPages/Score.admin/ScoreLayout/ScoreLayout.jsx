import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./ScoreLayout.css"

export const ScoresManagement = () => {
  const navigate = useNavigate(); 
  return (
      <div className='scores-management'>
       <div className="scores-header">
        <div className="scores-tittle"> Quản lý điểm </div>
       </div>
      <div className='scores-container'>
        <div className="scores-right">
          <div className="scores-navbar">
            <Link to="/admin/scores/list"><button onClick={() => navigate('/admin/scores/list')} className="scores-navbar-btn">Danh sách</button></Link>
            <Link to="/admin/students/add"><button onClick={() => navigate('/admin/scores/add')} className="scores-navbar-btn">Thêm sinh viên </button></Link>
            <Link to="/admin/scores/add"><button onClick={() => navigate('/admin/scores/add')} className="scores-navbar-btn">Nhập điểm </button></Link>
          </div>
        </div>
      </div>
      </div>
    

  )
}