import React from 'react'
import { Link } from 'react-router-dom';
import "./ScoreLayout.css"
export const ScoresManagement = () => {
 
  return (
      <div className='scores-management'>
       <div className="scores-header">
        <div className="scores-tittle"> Quản lý điểm </div>
       </div>
      <div className='scores-container'>
        <div className="scores-right">
          <div className="scores-navbar">
            <Link to="/admin/scores/list"><button>Danh sách</button></Link>
            <Link to="/admin/scores/add"><button>Nhập điểm </button></Link>
          </div>
        </div>
      </div>
      </div>
    

  )
}