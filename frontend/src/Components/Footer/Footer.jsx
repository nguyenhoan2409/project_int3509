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
            <p>PHYSICAL EDUCATION</p>
        </div>
        
        <ul className="footer-links">
            <li>About</li>
            <li>Contact</li>
            <li>Contact</li>
            <li>Contact</li>
            <li>Contact</li>
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
            <p>Copyright @ 2023 - All Right Reserverd</p>
        </div>
    </div>
  )
}
