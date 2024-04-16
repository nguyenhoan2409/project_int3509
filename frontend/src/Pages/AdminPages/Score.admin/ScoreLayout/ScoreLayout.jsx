import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./ScoreLayout.css"
import { FaHome } from "react-icons/fa";
import { Sidebar } from '~/Components/SideBar/Sidebar';
import Layout from '~/Pages/Layout/Layout';
export const ScoresManagement = ({ sideBarClick, handleClick }) => {
 
  return (
      <div className='scores-management'>
       <Box
        sx={{
          textAlign: "center",
          p: 2,
          background: (theme) => theme.palette.grey["200"],
          color: (theme) => theme.palette.success.main,
        }}
      >
        <Typography variant="h5">Quản lý điểm</Typography>
      </Box>
      <div className='scores-container'>
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