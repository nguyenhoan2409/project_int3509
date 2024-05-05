import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./ScoreLayout.css"
import { Box, Typography } from '@mui/material';
import Layout from '~/Pages/Layout/Layout';

export const ScoresManagement = () => {
  const navigate = useNavigate();
  return (
    
      <div className='scores-management'>
      <div className="title">Quản lý điểm</div>
    
      <div className='scores-container'>
        <div className="scores-right">
          <div className="scores-navbar">
            <button onClick={() => navigate('/admin/scores/list')} className="scores-navbar-btn">Danh sách</button>
            <button onClick={() => navigate('/admin/scores/add')} className="scores-navbar-btn">Nhập điểm </button>
          </div>
        </div>
      </div>
      </div>
    
  )
}