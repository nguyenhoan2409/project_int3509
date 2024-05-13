import React, { useEffect } from "react";
import "./home.css";
import { Navbar } from "~/Components/Navbar/Navbar";
import Cookies from "universal-cookie";
import { Footer } from "~/Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "~/features/authSlice";
import Layout from "../Layout/Layout";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());  
  }, []);
  return (
    <div className="hero">
      <Layout>
        <div className="hero-main">
          <div className="hero-title">
            GIỚI THIỆU VỀ TRUNG TÂM GIÁO DỤC THỂ CHẤT VÀ THỂ THAO, ĐẠI HỌC THĂNG LONG HÀ NỘI.
          </div>
          <img src = "https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/237714246_382520319924420_6990129102340605637_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGEhkOg2rEiXSpocIxTAeDOgBccT3AWeKSAFxxPcBZ4pM6KnQSskQ_NQno2TRwDW_V3TwvbCtedOSWJ7WxzFM2M&_nc_ohc=wLDES-k94KMQ7kNvgFj_fpm&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBc6I1BrGp0wop0Ep9XQXl43MLF8-H-CAzbEn_t2xfbjQ&oe=663AAADB" className="hero-img"/>
          <div className="hero-text">
          Địa chỉ: Nghiêm Xuân Yên – Quận Hoàng Mai – Hà Nội.
          </div>
          <div className="hero-text">
          Đại học Thăng Long là một trong những trường có hệ thống thể thao sành điệu bậc nhất. 
          Trường Thăng Long đã đầu tư xây dựng khu thể thao – thể chất rất hiện đại và thực sự là
           niềm mơ ước của nhiều sinh viên trường khác.
          </div>   
          <div className="hero-text"> 
          Khu thể thao – thể chất trường Thăng Long có thể đáp ứng nhu cầu của sinh viên ở nhiều môn 
          thể thao khác nhau như bóng đá, bóng rổ… Đặc biệt, trường còn đầu tư xây dựng hẳn một phòng 
          tập thể hình với điều kiện hiện đại không kém các phòng tập chuyên nghiệp để đáp ứng nhu cầu 
          nâng cao sức khỏe của sinh viên.
          </div>
        </div>
      </Layout>
    </div>
  );
};
