import React, { useState, useEffect} from 'react'
import './YourOrders.css'
import { useSelector } from 'react-redux';
import { TbListDetails } from "react-icons/tb";

export const YourOrders = () => {
  const {user} = useSelector(
    (state) => state.auth
  )
  const orders = user?.orderList; 
  return (
    <div className="yourorders">
      <div className='title'>Lịch sử</div>

      <table className='yourorders-table'>
        <thead>
          <tr>
            <th>Mã yêu cầu</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((item) => (
            <tr key={item.order_id}>
              <td  className='yourorders-table-row yourorders-table-row-15'>{item.order_id}</td>
              <td  className='yourorders-table-row yourorders-table-row-15'>{item.product_name}</td>
              <td  className='yourorders-table-row yourorders-table-row-10' >{item.quantity}</td>
              <td  className='yourorders-table-row yourorders-table-row-15'>{item.total_money}</td>
              <td  className='yourorders-table-row yourorders-table-row-35'>{item.description}</td>
              <td  className='yourorders-table-row yourorders-table-row-10'><TbListDetails className='yourorders-table-icon'/></td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}