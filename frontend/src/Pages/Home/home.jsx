import React from 'react'
import { Footer } from '~/Components/Footer/Footer'
import './home.css'
import hand_icon from "~/Components/Assets/hand_icon.png"
import arrow_icon from "~/Components/Assets/arrow.png"
import hero_image from "~/Components/Assets/hero_image.png"

export const Home = () => {
  return (
    <div className="hero">

      <div className="hero-title">
        <h2>GIỚI THIỆU VỀ TRUNG TÂM GIÁO DỤC THỂ CHẤT VÀ THỂ THAO, ĐẠI HỌC QUỐC GIA HÀ NỘI</h2>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  )
}

