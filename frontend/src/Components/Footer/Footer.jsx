import React from 'react'
import './Footer.css'
import footer_logo from '~/Components/Assets/Logo ĐH Quốc Gia Hà Nội-VNU.png'
import instagram_icon from '~/Components/Assets/instagram_icon.png'
import pintester_icon from '~/Components/Assets/pintester_icon.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>TRUNG TÂM GIÁO DỤC THỂ CHẤT & THỂ THAO VNU</p>
        </div>
        
        <ul className="footer-links">
            <li>Địa chỉ: 144 Xuân Thủy, Cầu Giấy, Hà Nội </li>
            <li>Website: ttgdtc.vnu.edu.vn </li>
            
        </ul>

        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>

            <div className="footer-icons-container">
                <img src={pintester_icon} alt="" />
            </div>
        </div>

        <div className="footer-copyright">
            <hr/>
            <p>Copyright @ 2024 - All Right Reserverd</p>
        </div>
    </div>
  )
}
