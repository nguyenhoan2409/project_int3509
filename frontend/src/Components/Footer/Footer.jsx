import React from 'react'
import './Footer.css'
import footer_logo from '~/Components/Assets/Logo ĐH Quốc Gia Hà Nội-VNU.png'
import { FaHome } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>TRUNG TÂM GIÁO DỤC THỂ CHẤT & THỂ THAO VNU</p>
        </div>
        
        <ul className="footer-links">
            <li><FaHome /> <p>144 Xuân Thủy, Cầu Giấy, Hà Nội</p> </li>
            <li><IoMdMail /> <p>ttgdtc.vnu.edu.vn</p> </li>
        </ul>

        <div className="footer-copyright">
            <hr/>
            <p style={{fontSize: '18px'}}>Copyright @ 2024 - All Right Reserverd</p>
        </div>
    </div>
  )
}
