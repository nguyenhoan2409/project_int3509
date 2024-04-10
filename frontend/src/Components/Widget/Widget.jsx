import React from "react";
import "./Widget.scss";

import { BsChevronUp } from "react-icons/bs";
import { IoPersonOutline, IoCartSharp } from "react-icons/io5";
import { MdMonetizationOn, MdOutlineAccountBalanceWallet } from "react-icons/md";


export const Widget = ({ type }) => {
    let data;

     // temp
    const amount = 500;
    const diff = 30;
  
    switch (type) {
      case "customer":
        data = {
          title: "SINH VIÊN ĐẠT CHUẨN",
          isMoney: false,
          link: "Xem chi tiết",
          icon: (
            <IoPersonOutline
              className="icon"
              style={{ color: "crimson", backgroundColor: "#ff000033" }}
            />
          ),
        };
        break;
      case "order":
        data = {
          title: "SỐ LƯỢNG YÊU CẦU",
          isMoney: false,
          link: "Xem chi tiết",
          icon: (
            <IoCartSharp
              className="icon"
              style={{ color: "goldenrod", backgroundColor: "#daa52033" }}
            />
          ),
            
        };
        break;
      case "earnings":
        data = {
          title: "LỢI NHUẬN",
          isMoney: true,
          link: "Xem chi tiết",
          icon: (
            <MdMonetizationOn 
              className="icon"
              style={{ color: "green", backgroundColor: "#00800033" }}
            />
          ),
          
        };
        break;
      case "balance":
        data = {
          title: "DOANH THU",
          isMoney: true,
          link: "Xem chi tiết",
          icon: (
            <MdOutlineAccountBalanceWallet 
              className="icon"
              style={{ color: "purple", backgroundColor: "#80008033" }}
            />
          ),
          
        };
        break;
  
      default:
        break;
    }

  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">
            {data.isMoney && "$"} {amount}
            </span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <BsChevronUp/>
                {diff}%
            </div>
            {data.icon}
        </div>
    </div>
  )
}
